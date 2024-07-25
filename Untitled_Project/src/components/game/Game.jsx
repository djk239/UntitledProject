import React, { useState, useRef, useEffect } from 'react';
import styles from './Game.module.css';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { AnimatePresence,motion } from "framer-motion"
import { fetchAccessToken, fetchClip, fetchSuggestions, getAccessToken } from '../../api';
import { playFull, playSnippet } from '../../audioUtils';
import AutosuggestInput from './AutosuggestInput';
import Trackprogress from './Trackprogress';
import GamePopup from './GamePopup';
import {prompts} from './prompts';  
import gameoversound from '/gameover.wav';

// Predefined snippet lengths in seconds
const snippetDurations = [0.5, 1, 2.5, 5, 10];
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Game() {
  // Initialize state variables
  const [prompt, setPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);
  const [guess, setGuess] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [guessCounter, setGuessCounter] = useState(5);
  const [songID, setSongID] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [audioUrl, setAudioUrl] = useState(''); 
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    guessesTaken: 0,
    correctTitle: '',
    correctArtist: '',
  });
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const sanitizeInput = (input) => DOMPurify.sanitize(input);

  // Triggered when the component mounts
  useEffect(() => {
    async function initialize() {
      // Fetch access token and load a new clip
      const token = await fetchAccessToken();
      setAccessToken(token);
      await loadNewClip();
    }
    initialize();
  }, []);

  // Function to load a new audio clip
  const loadNewClip = async () => {
    const clip = await fetchClip();
    setAudioUrl(clip.url);
    setSongID(clip.id);
    setPopupData({
      guessesTaken: 0,
      correctTitle: '',
      correctArtist: '',
    });
    setProgress(0);
  };

  // Triggered when the score or isLoggedIn status changes
  useEffect(() => {
    setGuessCounter(5);
  }, [score]);  

  // Triggered when the guess counter changes
  useEffect(() => {
    if (guessCounter === 0) {
      // Show Popup when guesses reach 0
      playFull(audioRef, gameoversound);
      setShowPopup(true);

    }
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  }, [guessCounter]);  

  // Function to play an audio snippet
  const handlePlaySnippet = () => {
    // Calculate the snippet duration based on the guess counter
    const snippetDuration = snippetDurations[5 - guessCounter];
    playSnippet(audioRef, audioUrl, snippetDuration, setProgress, guessCounter, intervalRef, timeoutRef);
  };

  // Function to submit a guess
  const onSubmitGuess = async () => {
    // Decrement the guess counter
    setGuessCounter(guessCounter-1);
    // Reset the guess input
    setGuess('');

    try {
      // Get the access token and send a POST request to check the guess
      const token = await getAccessToken();
      const response = await axios.post(`${API_BASE_URL}/api/songs/check/`, {
        title: sanitizeInput(guess),
        id: sanitizeInput(songID), 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Guess sent and correct:', response.data);
      setScore(score+1)
      setShowPopup(true);
      setPopupData({
        guessesTaken: 6 - guessCounter,
        correctTitle: response.data.song.title,
        correctArtist: response.data.song.artist,
      });
      playFull(audioRef, audioUrl);
    } catch (error) {
      console.error('Error sending guess or incorrect. Check console for details:', error);
    }
  };

  const handleNextBtn = () => { 
    setShowPopup(false);
    loadNewClip();
    setGuessCounter(5);
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    audioRef.current.pause();
  };

  // Function to handle a suggestion selection
  const handleSuggestionSelected = (suggestion) => {
    // Update the guess input with the selected suggestion
    setGuess(suggestion.title);
    // Reset the suggestions list
    setSuggestions([]);
  };

  return (
    <div className={styles.container}>
      <motion.h1 className={styles.tagline} key={prompt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} exit={{ opacity: 0 }}>{prompt}</motion.h1>
      <div className={styles.audiocontainer}>
        <Trackprogress progress={progress} duration={snippetDurations[5 - guessCounter]} guessesRemaining={guessCounter} />
        <audio ref={audioRef} playsInline preload='none' />
      </div>
      <p className={styles.guesses}>Guesses Remaining: {guessCounter}</p>
      <p className={styles.score}>Score: {score}</p>
      <div className={styles.playcontainer}>
        <motion.button className={styles.playbtn} onClick={handlePlaySnippet} whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}>
          Play
        </motion.button>
        <motion.button whileTap={{scale: 0.9}} whileHover={{scale: 1.05}} className={styles.skipbtn} onClick={() => setGuessCounter(guessCounter - 1)}>
          Skip
        </motion.button>
      </div>
      <div className={styles.guesscontainer}>
      <AutosuggestInput
          guess={guess}
          setGuess={setGuess}
          suggestions={suggestions}
          // Fetch suggestions when the input value changes
          fetchSuggestions={(value) => fetchSuggestions(value, accessToken).then(setSuggestions)}
          onSuggestionSelected={handleSuggestionSelected}
        />
        <motion.button className={styles.subguess} onClick={onSubmitGuess} whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}>
          &gt;
        </motion.button>
      </div>
      <AnimatePresence>
        {showPopup && (
            <GamePopup
              guessesTaken={popupData.guessesTaken}
              correctTitle={popupData.correctTitle}
              correctArtist={popupData.correctArtist}
              handleNextBtn={handleNextBtn}
              timetoguess={snippetDurations[5 - guessCounter]}
            />
        )}
      </AnimatePresence>
    </div>
  );
}