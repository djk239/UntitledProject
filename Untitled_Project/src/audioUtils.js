/**
 * Plays an audio snippet for a predefined length of time based on the number of guesses remaining.
 *
 * Preconditions:
 * - audioRef is a valid React reference to an audio element.
 * - songUrl is a valid URL of the audio snippet to be played.
 * - snippetDuration is a positive number representing the duration of the audio snippet in seconds.
 * - setProgress is a function that updates the progress of the audio playback.
 * - guessCounter is a non-negative integer representing the number of guesses remaining.
 *
 * Postconditions:
 * - The audio snippet is played for the specified duration.
 * - The audio playback is paused after the specified duration.
 * - The progress of the audio playback is updated at regular intervals.
 *
 * @param {Object} audioRef - A React reference to an audio element.
 * @param {string} songUrl - The URL of the audio snippet to be played.
 * @param {number} snippetDuration - The duration of the audio snippet in seconds.
 * @param {function} setProgress - A function that updates the progress of the audio playback.
 * @param {number} guessCounter - The number of guesses remaining.
 */

export const playSnippet = (audioRef, songUrl, snippetDuration, setProgress, guessCounter) => {
  audioRef.current.src = songUrl;
  audioRef.current.currentTime = 0;
  audioRef.current.volume = 0.1;
  audioRef.current.play();
  setProgress(0);

  /**
   * The progress percentage is calculated based on the guess counter, increasing by 20% intervals.
   * This interval function updates the progress of the audio playback every 100 milliseconds.
   * It also checks if the current playback time has exceeded the snippet duration, and if so, pauses the playback and resets the progress.
   */
  const interval = setInterval(() => {
    const currentTime = audioRef.current.currentTime;
    const progressPercentage = ((6-guessCounter) / 5 ) * 100;
    setProgress(progressPercentage);

    if (currentTime >= snippetDuration) {
      audioRef.current.pause();
      clearInterval(interval);
      setProgress(0);
    }
  }, 100);

  /**
   * This timeout function ensures that the audio playback is paused and the progress is reset after the specified snippet duration.
   * Sets src to empty, disabling lockscreen controls
   * It also clears the interval function to prevent any further updates.
   * The timeout is set to the snippet duration in milliseconds, ensuring that the playback is paused at the correct time.
   */
  setTimeout(() => {
    audioRef.current.pause();
    audioRef.current.src = '';
    clearInterval(interval);
    setProgress(0);
  }, snippetDuration * 1000);
};