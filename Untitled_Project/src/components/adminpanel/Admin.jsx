import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Admin.module.css';
import { addSong, getAudioLink } from '../../api';

export default function Admin() {
  
  // State for holding song details
  const [songData, setSongData] = useState({
    title: '',
    artist: '',
    link: '',
    isPlayable: false,
  });

  // States for Spotify Link and the Retrieved Link with audio file
  const [spotifyLink, setSpotifyLink] = useState('');
  const [playlink, setPlaylink] = useState('');

  const handleAddSong = async (e) => {
    e.preventDefault();
    try {
      await addSong(songData.title, songData.artist, songData.link, songData.isPlayable);
      toast.success('Song added successfully!', { toastId: 'success-add' });
    } catch (error) {
      // Alert Admin of error, print error to console
      toast.error('Error adding song.', { toastId: 'error-add' });
      console.error("Error details:", error); 
    }
  };

  const handleGetLink = async (e) => {
    e.preventDefault();
    try {
      const audioSource = await getAudioLink(spotifyLink);
      setPlaylink(audioSource);
      toast.success('Link retrieved successfully!', { toastId: 'success-get' });
    } catch (error) {
      // Alert Admin of error, print error to console
      toast.error('Error getting link.', { toastId: 'error-get' });
      console.error("Error details:", error); 
    }
  };

  return (
    <div className={styles.Admin}>
      <Header />
      <div className={styles.content}>
        {/* Add song form */} 
        <form className={styles.form} onSubmit={handleAddSong}>
          <h1>Add Song</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter song title"
            name="title" 
            value={songData.title}
            onChange={(e) => setSongData({ ...songData, title: e.target.value })} 
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Enter artist name"
            name="artist" 
            value={songData.artist}
            onChange={(e) => setSongData({ ...songData, artist: e.target.value })} 
          />
          <input
            type="url"
            className={styles.input}
            placeholder="Link"
            name="link" 
            value={songData.link}
            onChange={(e) => setSongData({ ...songData, link: e.target.value })} 
          />
          <div>
            <label className={styles.label}>Playable?</label>
            <input
              type="checkbox"
              className={styles.label}
              name="isPlayable" 
              checked={songData.isPlayable}
              onChange={(e) => setSongData({ ...songData, isPlayable: e.target.checked })} 
            />
          </div>
          <input type="submit" className={styles.input} value="Add Song" />
        </form>

        {/* Get link form */} 

        <form className={styles.form} onSubmit={handleGetLink}>
          <h1>Get Link</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Spotify link"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
          />
          <input type="submit" className={styles.input} value="Get Link" />
          <p className={styles.label}>Link: {playlink}</p>
        </form>
      </div>
      <Footer />
      <ToastContainer limit={2} />
    </div>
  );
}