/**
 * Plays a snippet of the audio from the provided song URL.
 * 
 * @param {object} audioRef - A React ref object containing the audio element.
 * @param {string} songUrl - The URL of the song to play.
 * @param {number} snippetDuration - The durations able to be played.
 * @param {function} setProgress - Function to update the playback progress.
 * @param {number} guessCounter - Counter that affects the snippet length and progress calculation.
 * @param {object} intervalRef - A React ref object to store the interval ID.
 * @param {object} timeoutRef - A React ref object to store the timeout ID.
 * 
 * Preconditions:
 * - `audioRef` should be a valid React ref object pointing to an HTMLAudioElement.
 * - `songUrl` should be a valid URL string.
 * - `snippetDuration` should be a list of positive numbers representing the durations in seconds.
 * - `setProgress` should be a valid function to update progress.
 * - `guessCounter` should be a number between 0 and 5.
 * - `intervalRef` and `timeoutRef` should be valid React ref objects.
 * 
 * Postconditions:
 * - The audio snippet will start playing and will stop after `snippetDuration` seconds or when `currentTime` reaches `snippetDuration`.
 * - `setProgress` will be called periodically to update the playback progress.
 * - Any previous interval or timeout will be cleared before setting new ones.
 */
export const playSnippet = (audioRef, songUrl, snippetDuration, setProgress, guessCounter, intervalRef, timeoutRef) => {
  // Set audio source and initial properties
  audioRef.current.src = songUrl;
  audioRef.current.currentTime = 0;
  audioRef.current.volume = 0.1;
  audioRef.current.play();
  setProgress(0);

  // Set up interval to update progress and stop audio after snippet duration
  intervalRef.current = setInterval(() => {
    const currentTime = audioRef.current.currentTime;
    const progressPercentage = ((6 - guessCounter) / 5) * 100;
    setProgress(progressPercentage);
    if (currentTime >= snippetDuration) {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
      setProgress(0);
    }
  }, 100);

  // Clear any previous timeout
  clearTimeout(timeoutRef.current);

  // Set up timeout to stop audio after snippet duration
  timeoutRef.current = setTimeout(() => {
    audioRef.current.pause();
    audioRef.current.src = '';
    clearInterval(intervalRef.current);
    setProgress(0);
  }, snippetDuration * 1000);
};

/**
 * Plays the full audio from the provided song URL.
 * 
 * @param {object} audioRef - A React ref object containing the audio element.
 * @param {string} songUrl - The URL of the song to play.
 * 
 * Preconditions:
 * - `audioRef` should be a valid React ref object pointing to an HTMLAudioElement.
 * - `songUrl` should be a valid URL string.
 * 
 * Postconditions:
 * - The full audio will start playing from the beginning.
 */
export const playFull = (audioRef, songUrl) => {
  // Set audio source and initial properties
  audioRef.current.src = songUrl;
  audioRef.current.currentTime = 0;
  audioRef.current.volume = 0.1;
  audioRef.current.play();
};
