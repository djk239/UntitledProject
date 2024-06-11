import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Admin.module.css';
import { addSong, getAudioLink } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [link, setLink] = useState('');
  const [isPlayable, setIsPlayable] = useState(false);

  const [spotifyLink, setSpotifyLink] = useState('');
  const [playlink, setPlaylink] = useState('');

  const handleAddSong = async (e) => {
    e.preventDefault();
    try {
      const data = await addSong(title, artist, link, isPlayable);
      toast.success('Song added successfully!');
    } catch (error) {
      toast.error('Error adding song.');
    }
  };

  const handleGetLink = async (e) => {
    e.preventDefault();
    try {
      const audioSource = await getAudioLink(spotifyLink);
      setPlaylink(audioSource);
      toast.success('Link retrieved successfully!');
    } catch (error) {
      toast.error('Error getting link.');
    }
  };

  return (
    <div className={styles.Admin}>
      <Header />
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleAddSong}>
          <h1>Add Song</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Enter artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <input
            type="url"
            className={styles.input}
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <div>
            <label className={styles.label}>Playable?</label>
            <input
              type="checkbox"
              className={styles.label}
              placeholder="Enter song title"
              checked={isPlayable}
              onChange={(e) => setIsPlayable(e.target.checked)}
            />
          </div>
          <input type="submit" className={styles.input} />
        </form>
        <form className={styles.form} onSubmit={handleGetLink}>
          <h1>Get Link</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Spotify link"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
          />
          <input type="submit" className={styles.input} />
          <p className={styles.label}>Link: {playlink}</p>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
