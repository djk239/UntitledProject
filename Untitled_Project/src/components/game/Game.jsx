import React, { useState, useRef, useEffect } from 'react';
import styles from './Game.module.css';
import axios from 'axios';
import { motion } from "framer-motion"
import { fetchAccessToken, fetchClip, fetchSuggestions, getAccessToken } from '../../api';
import { playSnippet } from '../../audioUtils';
import AutosuggestInput from './AutosuggestInput';

const snippetDurations = [0.1, 0.5, 1, 5, 10]; // Predefined snippet lengths in seconds

export default function Game({isLoggedIn}) {
  const [guess, setGuess] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [guessCounter, setGuessCounter] = useState(5);
  const [songID, setSongID] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [audioUrl, setAudioUrl] = useState(''); 
  const audioRef = useRef(null);

  useEffect(() => {
    async function initialize() {
      const token = await fetchAccessToken();
      setAccessToken(token);
      await loadNewClip();
    }
    initialize();
  }, []);

  const loadNewClip = async () => {
    const clip = await fetchClip();
    setAudioUrl(clip.url);
    setSongID(clip.id);
    setGuessCounter(5);
  };

  useEffect(() => {
    loadNewClip();
  }, [score, isLoggedIn]);

  useEffect(() => {
    if (guessCounter === 0) {
      loadNewClip();
      setGuessCounter(5);
    }
  }, [guessCounter]);

  const handlePlaySnippet = () => {
    const snippetDuration = snippetDurations[5 - guessCounter];
    playSnippet(audioRef, audioUrl, snippetDuration, setProgress);
  };

  const onSubmitGuess = async () => {
    setGuessCounter(guessCounter-1);
    setGuess('');

    try {
      const token = getAccessToken();
      const response = await axios.post('http://192.168.1.173:8000/api/songs/check/', {
        title: guess,
        id: songID, 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Guess sent and correct:', response.data);
      setScore(score+1)
    } catch (error) {
      console.error('Error sending guess or incorrect. Check console for details:', error);
    }
  };

  const handleSuggestionSelected = (suggestion) => {
    setGuess(suggestion.title);
    setSuggestions([]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.score}>Score: {score}</h1>
      <h1 className={styles.header}>Guess the Song</h1>
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
        <div className={styles.tracklength}>
          <motion.div className={styles.trackprogress} animate={{ width: `${progress}%` }} />
        </div>
        <audio ref={audioRef} />
      </div>
      <div className={styles.guesscontainer}>
      <AutosuggestInput
          guess={guess}
          setGuess={setGuess}
          suggestions={suggestions}
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
