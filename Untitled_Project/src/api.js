import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const SPOTIFY_API_BASE_URL = import.meta.env.VITE_SPOTIFY_API_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const TOKEN_ENDPOINT = import.meta.env.VITE_SPOTIFY_TOKEN_ENDPOINT;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// SPOTIFY API CALLS

/**
 * Fetches an access token for the Spotify API.
 * 
 * Preconditions:
 * - The CLIENT_ID and CLIENT_SECRET constants are set to the correct Spotify API credentials.
 * 
 * Postconditions:
 * - Returns the access token as a string.
 * - Throws an error if the API call fails.
 */
export const fetchAccessToken = async () => {
  try {
      // Create a string of the client ID and secret, and encode it using Base64
      const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
      const encodedCredentials = btoa(credentials);
      
      // Make a POST request to the Spotify API to fetch an access token
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
      
      // Return the access token from the response data
      return response.data.access_token;
  } catch (error) {
      // Log the error and throw it again to handle it in the caller function
      console.error('Error fetching access token:', error);
      throw error;
  }
};

/**
 * Fetches song suggestions from the Spotify API based on a query.
 * 
 * Preconditions:
 * - The query parameter is provided and is a non-empty string.
 * - The accessToken parameter is provided and is a valid Spotify API access token.
 * 
 * Postconditions:
 * - Returns an array of objects, where each object contains the song title and the artist's name.
 * - Throws an error if the API call fails.
 */
export const fetchSuggestions = async (query, accessToken) => {
  try {
      // Make a GET request to the Spotify API to fetch song suggestions
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
      
      // Get the response data
      const data = response.data; 
      
      // If the response data contains tracks, map the track items to objects with title and artist, and return the array
      if (data.tracks && data.tracks.items) {
          return data.tracks.items.map((item) => ({
              title: item.name,
              artist: item.artists.map((artist) => artist.name).join(', '),
          }));
      }
  } catch (error) {
      // Log the error and throw it again to handle it in the caller function
      console.error('Error fetching suggestions:', error);
      throw error;
  }
};

// CUSTOM API CALLS

/**
 * Fetches a random song clip from the API.
 * 
 * Preconditions:
 * - The user is logged in and has a valid access token.
 * - The API_BASE_URL is set to the correct backend URL.
 * 
 * Postconditions:
 * - Returns the data of the fetched song clip.
 * - Throws an error if the API call fails.
 */
export const fetchClip = async () => {
  try {      
      // Make a GET request to the API to fetch a random song clip
      const response = await axios.get(`${API_BASE_URL}/api/songs/random/`);
      
      // Return the data of the fetched song clip
      return response.data;
  } catch (error) {
      // Log the error and throw it again to handle it in the caller function
      console.error('Error fetching data:', error);
      throw error;
  }
};

/**
* Adds a new song to the API.
* 
* Preconditions:
* - The user is logged in and has a valid access token.
* - The API_BASE_URL is set to the correct backend URL.
* - The title, artist, link, and isPlayable parameters are provided.
* 
* Postconditions:
* - Returns the data of the added song.
* - Throws an error if the API call fails.
*/
export const addSong = async (title, artist, link, isPlayable) => {
  try {
      // Get the access token from local storage
      const token = await getAccessToken();
      
      // Make a POST request to the API to add a new song
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
      
      // Return the data of the added song
      return response.data;
  } catch (error) {
      // Log the error and throw it again to handle it in the caller function
      console.error('Error adding song:', error);
      throw error;
  }
};

/**
* Gets the audio link of a song from the API.
* 
* Preconditions:
* - The user is logged in and has a valid access token.
* - The API_BASE_URL is set to the correct backend URL.
* - The spotifyLink parameter is provided.
* 
* Postconditions:
* - Returns the audio link of the song.
* - Throws an error if the API call fails.
*/
export const getAudioLink = async (spotifyLink) => {
  try {
      // Get the access token from local storage
      const token = await getAccessToken();
      
      // Make a GET request to the API to get the audio link of a song
      const response = await axios.get(`${API_BASE_URL}/api/getsource/`, {
          params: {
              spotify_url: spotifyLink,
          },
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      
      // Return the audio link of the song
      return response.data.audio_source;
  } catch (error) {
      // Log the error and throw it again to handle it in the caller function
      console.error('Error getting link:', error);
      throw error;
  }
};

export const getAllSongs = async () => {
    try {
        // Get the access token from local storage
        const token = await getAccessToken();
        
        // Make a GET request to the API to get the audio link of a song
        const response = await axios.get(`${API_BASE_URL}/api/songs/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        // Return the audio link of the song
        return response.data;
    } catch (error) {
        // Log the error and throw it again to handle it in the caller function
        console.error('Error getting link:', error);
        throw error;
    }
  };

  export const switchPlayability = async (id, data) => {
    try {
        // Get the access token from local storage
        const token = await getAccessToken();
        
        // Make a GET request to the API to get the audio link of a song
        const response = await axios.patch(`${API_BASE_URL}/api/songs/${id}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        // Return the audio link of the song
        return response.data;
    } catch (error) {
        // Log the error and throw it again to handle it in the caller function
        console.error('Error changing playability:', error);
        throw error;
    }
  };


// SIGNUP / LOGIN API CALLS

/**
* Signs up a new user to the API.
* 
* Preconditions:
* - The userInfo parameter is provided and contains the required user information.
* - The API_BASE_URL is set to the correct backend URL.
* 
* Postconditions:
* - Returns the data of the signed up user.
* - Throws an error if the API call fails.
*/
export const signup = async (userInfo) => {
  try {
      // Make a POST request to the API to sign up a new user
      const response = await axios.post(`${API_BASE_URL}/api/signup/`, userInfo);
      
      // Return the data of the signed up user
      return response.data;
  } catch (error) {
      // Throw the error data to handle it in the caller function
      throw error.response.data;
  }
};

/**
* Logs in a user to the API.
* 
* Preconditions:
* - The credentials parameter is provided and contains the required login credentials.
* - The API_BASE_URL is set to the correct backend URL.
* 
* Postconditions:
* - Returns the data of the logged in user.
* - Sets the access token and refresh token in local storage.
* - Throws an error if the API call fails.
*/
export const login = async (credentials) => {
  try {
      // Make a POST request to the API to log in a user
      const response = await axios.post(`${API_BASE_URL}/api/login/`, credentials);
      
      // Get the access token and refresh token from the response data
      const { access, refresh } = response.data;

      const decodedToken = jwtDecode(access);
      const expTime = decodedToken.exp * 1000;     
      // Set the access token and refresh token in local storage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('expTime', expTime);
      const groups = await fetchGroup();
      localStorage.setItem('groups', groups);
      console.log(groups);
      
      // Return the data of the logged in user
      return response.data;
  } catch (error) {
      // Throw the error data to handle it in the caller function
      throw error.response.data;
  }
};

// Function to check if access token is expired
const isAccessTokenExpired = () => {
    const expirationTime = localStorage.getItem('expTime');
    if (!expirationTime) {
      return true; // No expiration time found, consider expired
    }
    
    const now = new Date().getTime();
    return now > expirationTime; // Return true if current time is after expiration time
  };
  
  // Function to refresh access token using refresh token
  export const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
  
      const response = await axios.post(
        `${API_BASE_URL}/api/token/refresh/`, {refresh: refreshToken}
      );
  
      const { access, refresh } = response.data;
  
      // Update tokens in localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
  
      const decodedToken = jwtDecode(access);
      const expTime = decodedToken.exp * 1000;
      const userGroups = decodedToken.groups;
      localStorage.setItem('expTime', expTime);
  
      return access;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };
  
  // Modify getAccessToken to check and refresh token if expired
  export const getAccessToken = async () => {
    let token = localStorage.getItem('accessToken');
    const expirationTime = localStorage.getItem('expTime');
  
    if (!token || !expirationTime || isAccessTokenExpired()) {
      // Token is expired or not available, refresh it
      try {
        token = await refreshAccessToken();
      } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
      }
    }
  
    return token;
  };
  

/**
* Removes the access token and refresh token from local storage.
* 
* Preconditions:
* - The access token and refresh token are set in local storage.
* 
* Postconditions:
* - The access token and refresh token are removed from local storage.
*/
export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expTime');
};

export const fetchTopScores = async () => {
    try {
        // Get the access token from local storage
        const token = await getAccessToken();
        
        // Make a GET request to the API to fetch 
        const response = await axios.get(`${API_BASE_URL}/api/top-scores/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        
        console.log(response.data);     
        return response.data;
    } catch (error) {
        // Log the error and throw it again to handle it in the caller function
        console.error('Error fetching data:', error);
        throw error;
    }
  };


  export const fetchMyScore = async () => {
    try {
        // Get the access token from local storage
        const token = await getAccessToken();
        
        // Make a GET request to the API to fetch player score
        const response = await axios.get(`${API_BASE_URL}/api/user-score/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        // Return the data of the fetched score
        console.log(response.data);     
        return response.data;
    } catch (error) {
        // Log the error and throw it again to handle it in the caller function
        console.error('Error fetching data:', error);
        throw error;
    }
  };
  
  export const fetchGroup = async () => {
    try {
        // Get the access token from local storage
        const token = await getAccessToken();
        
        // Make a GET request to the API to fetch player score
        const response = await axios.get(`${API_BASE_URL}/api/user-groups/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        // Return the data of the fetched score
        console.log(response.data);     
        return response.data;
    } catch (error) {
        // Log the error and throw it again to handle it in the caller function
        console.error('Error fetching data:', error);
        throw error;
    }
  };