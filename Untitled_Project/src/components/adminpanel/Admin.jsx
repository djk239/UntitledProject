import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Admin.module.css';
import { addSong, getAudioLink, getAllSongs, switchPlayability } from '../../api';
import { motion } from "framer-motion";
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

  const [songs, setSongs] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllSongs = async () => {
        try {
            const allSongs = await getAllSongs();
            console.log('fetched songs:', allSongs);
            setSongs(allSongs);
            setError(null); // Clear any previous error
        } catch (error) {
            console.error(error);
            setError(error.message || 'Failed to fetch songs.');
        }
    };

    fetchAllSongs();
}, []);



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

  const switchSong = async (id, curState) => {
    try {
      const isPlayable = !curState;
      const data = {isPlayable: isPlayable};
      const patchedSong = await switchPlayability(id, data);
      console.log('Song updated successfully:', patchedSong);
      toast.success('Song updated successfully!', { toastId: 'success-update' });
    } catch (error) {
      // Alert Admin of error, print error to console
      toast.error('Error updating song.', { toastId: 'error-update' });
      console.error("Error details:", error); 
    }
  };
  

  return (
    <div className={styles.Admin}>
      <Header />
      <div className={styles.content}>
        {/* Add song form */} 
        <form className={styles.form} onSubmit={handleAddSong}>
          <h1 className={styles.title}>Add Song</h1>
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
          <motion.button type="submit" className={styles.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>Add Song</motion.button>
        </form>

        {/* Get link form */} 

        <form className={styles.form} onSubmit={handleGetLink}>
          <h1 className={styles.title}>Get Link</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Spotify link"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
          />
          <motion.button type="submit" className={styles.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>Get Link</motion.button>
          <p className={styles.label}>Link: {playlink}</p>
        </form>
        <div className={styles.songcontainer}>
          <h1 className={styles.title}>Songs in database</h1>
          <div className={styles.scrollable}>

            {songs.length > 0 ? (
              <ul className={styles.list}>
              {songs.map((song, index) => (
                <li className={styles.songs} key={index}>
                {song.title} - {song.artist} - {song.isPlayable ? 'Playable' : 'Not Playable'}
                <input
                type="checkbox"
                className={styles.switch}
                name="isPlayable" 
                checked={song.isPlayable}
                onChange={() => switchSong(song.id, song.isPlayable)}
                />
              </li>
            ))}
            </ul>
            ) : (
              <p className={styles.error}>{error}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer limit={2} />
    </div>
  );
}