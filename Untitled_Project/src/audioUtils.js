export const playSnippet = (audioRef, songUrl, snippetDuration, setProgress) => {
    audioRef.current.src = songUrl;
    audioRef.current.currentTime = 0;
    audioRef.current.volume = 0.1;
    audioRef.current.play();
  
    const interval = setInterval(() => {
      const currentTime = audioRef.current.currentTime;
      const progressPercentage = (currentTime / 10) * 100;
      setProgress(progressPercentage);
  
      if (currentTime >= snippetDuration) {
        audioRef.current.pause();
        clearInterval(interval);
        setProgress(0);
      }
    }, 100);
  
    setTimeout(() => {
      audioRef.current.pause();
      clearInterval(interval);
      setProgress(0);
    }, snippetDuration * 1000);
  };
  