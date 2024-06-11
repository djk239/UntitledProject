import axios from 'axios';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = '92c197ccced844e0afb389001abc394b';
const CLIENT_SECRET = 'b71745f784df4b2398557d04a71a7378';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

//CUSTOM API ENDPOINT
const API_BASE_URL = 'http://192.168.1.173:8000';


//SPOTIFY API CALLS
export const fetchAccessToken = async () => {
  try {
    const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encodedCredentials = btoa(credentials);
    const response = await axios.post(
      TOKEN_ENDPOINT,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

export const fetchSuggestions = async (query, accessToken) => {
  try {
    const response = await axios.get(
      `${SPOTIFY_API_BASE_URL}/search`,
      {
        params: {
          q: query,
          type: 'track',
          market: 'US',
          limit: 5,
          offset: 0,
          include_external: 'audio',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const { data } = response;
    if (data.tracks && data.tracks.items) {
      return data.tracks.items.map((item) => item.name);
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};

// CUSTOM API CALLS

export const fetchClip = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/api/songs/random`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const addSong = async (title, artist, link, isPlayable) => {
    try {
      const token = getAccessToken();
      const response = await axios.post(`${API_BASE_URL}/api/songs/`, {
        title,
        artist,
        audio_link: link,
        isPlayable,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding song:', error);
      throw error;
    }
  };
  
  export const getAudioLink = async (spotifyLink) => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/api/getsource/`, {
        params: {
          spotify_url: spotifyLink,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.audio_source;
    } catch (error) {
      console.error('Error getting link:', error);
      throw error;
    }
  };


  // SIGNUP / LOGIN API CALLS
  export const signup = async (userInfo) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/signup/`, userInfo);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

  export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login/`, credentials);
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};