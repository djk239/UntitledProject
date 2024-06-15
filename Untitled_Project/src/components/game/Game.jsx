import React, { useState, useRef, useEffect } from 'react';
import styles from './Game.module.css';
import axios from 'axios';
import { motion } from "framer-motion"
import { fetchAccessToken, fetchClip, fetchSuggestions, getAccessToken } from '../../api';
import { playSnippet } from '../../audioUtils';
import AutosuggestInput from './AutosuggestInput';
import Trackprogress from './Trackprogress';

// Predefined snippet lengths in seconds
const snippetDurations = [0.5, 1, 2.5, 5, 10];

export default function Game({isLoggedIn}) {
  // Initialize state variables
  const [guess, setGuess] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [guessCounter, setGuessCounter] = useState(5);
  const [songID, setSongID] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [audioUrl, setAudioUrl] = useState(''); 
  const audioRef = useRef(null);

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
    setGuessCounter(5);
  };

  // Triggered when the score or isLoggedIn status changes
  useEffect(() => {
    loadNewClip();
  }, [score, isLoggedIn]);

  // Triggered when the guess counter changes
  useEffect(() => {
    if (guessCounter === 0) {
      // Load a new clip when the guess counter reaches 0
      loadNewClip();
      setGuessCounter(5);
    }
  }, [guessCounter]);

  // Function to play an audio snippet
  const handlePlaySnippet = () => {
    // Calculate the snippet duration based on the guess counter
    const snippetDuration = snippetDurations[5 - guessCounter];
    playSnippet(audioRef, audioUrl, snippetDuration, setProgress, guessCounter);
  };

  // Function to submit a guess
  const onSubmitGuess = async () => {
    // Decrement the guess counter
    setGuessCounter(guessCounter-1);
    // Reset the guess input
    setGuess('');

    try {
      // Get the access token and send a POST request to check the guess
      const token = getAccessToken();
      const response = await axios.post('/api/songs/check/', {
        title: guess,
        id: songID, 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Guess sent and correct:', response.data);
      // Increment the score if the guess is correct
      setScore(score+1)
    } catch (error) {
      console.error('Error sending guess or incorrect. Check console for details:', error);
    }
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
      <h1 className={styles.score}>Score: {score}</h1>
      <h1 className={styles.header}>Name the Melody</h1>
      <div className={styles.audiocontainer}>
        <svg
          className={styles.playbutton}
          onClick={handlePlaySnippet}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="100"
          height="100"
        >
          <circle cx="50" cy="50" r="45" fill="#070707" />
          <polygon points="35,25 75,50 35,75" fill="#eeebeb" />
        </svg>
          <Trackprogress progress={progress} duration={snippetDurations[5 - guessCounter]} />
        <audio ref={audioRef} />
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
      <motion.button whileTap={{scale: 0.9}} whileHover={{scale: 1.05}} className={styles.skipbtn} onClick={() => setGuessCounter(guessCounter - 1)}>
        Skip
      </motion.button>
    </div>
  );
}