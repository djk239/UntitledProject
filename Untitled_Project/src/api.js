import axios from 'axios';
import { jwtDecode } from "jwt-decode";

// Variables from env (config.js on hosting)

const SPOTIFY_API_BASE_URL = (window.config && window.config.SPOTIFY_API_BASE_URL) || import.meta.env.SPOTIFY_API_BASE_URL;
const CLIENT_ID = (window.config && window.config.CLIENT_ID) || import.meta.env.CLIENT_ID;
const CLIENT_SECRET =  (window.config && window.config.CLIENT_SECRET) || import.meta.env.CLIENT_SECRET;
const TOKEN_ENDPOINT =  (window.config && window.config.TOKEN_ENDPOINT) || import.meta.env.TOKEN_ENDPOINT;
const API_BASE_URL =  (window.config && window.config.API_BASE_URL) || import.meta.env.API_BASE_URL;



// SPOTIFY CALLS

/**
 * Fetches an access token from the Spotify API using client credentials.
 * 
 * Preconditions:
 * - `CLIENT_ID` and `CLIENT_SECRET` should be valid and correctly set.
 * - `TOKEN_ENDPOINT` should be the correct URL for fetching the token.
 * 
 * Postconditions:
 * - Returns the access token as a string if the request is successful.
 * - Logs an error and throws it if the request fails.
 * 
 * @returns {Promise<string>} The access token.
 */
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

let debounceTimeout;
let lastQuery = '';
let cachedSuggestions = null;

/**
 * Fetches song suggestions from the Spotify API based on a search query.
 * 
 * @param {string} query - The search query for fetching song suggestions.
 * @param {string} accessToken - The access token for authorization with the Spotify API.
 * 
 * Preconditions:
 * - `query` should be a non-empty string.
 * - `accessToken` should be a valid Spotify API access token.
 * 
 * Postconditions:
 * - Returns an array of song suggestions if the request is successful.
 * - Each suggestion includes the song title and artist(s).
 * - Logs an error and throws it if the request fails.
 * 
 * @returns {Promise<Array<{title: string, artist: string}>>} An array of song suggestions.
 */
export const fetchSuggestions = async (query, accessToken, callback) => {
  // Check if the query hasn't changed
  if (query === lastQuery && cachedSuggestions) {
      callback(null, cachedSuggestions);
      return;
  }

  // Update the last query
  lastQuery = query;

  // Clear previous debounce timer
  if (debounceTimeout) {
      clearTimeout(debounceTimeout);
  }

  // Set up a new debounce timer
  debounceTimeout = setTimeout(async () => {
      try {
          // Make the API request
          const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
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
          });

          const data = response.data;

          if (data.tracks && data.tracks.items) {
              const suggestions = data.tracks.items.map((item) => ({
                  title: item.name,
                  artist: item.artists.map((artist) => artist.name).join(', '),
              }));

              // Cache the suggestions
              cachedSuggestions = suggestions;
              callback(null, suggestions);
          }
      } catch (error) {
          console.error('Error fetching suggestions:', error);
          callback(error, null);
      }
  }, 300); // Adjust debounce delay (e.g., 300ms) as needed
};


// CALLS TO BACKEND CUSTOM API

/**
 * Fetches song to be played in the game component.
 * 
 * 
 * Preconditions:
 * - None
 * 
 * Postconditions:
 * - Returns a song url to be played and song ID for it to be checked agianst.
 * 
 */
export const fetchClip = async () => {
  try {      
      
      const response = await axios.get(`${API_BASE_URL}/api/songs/random/`);
      
      // Return the data of the fetched song clip
      return response.data;
  } catch (error) {
      
      console.error('Error fetching data:', error);
      throw error;
  }
};

/**
 * Adds a new song to the database via the admin panel.
 * 
 * @param {string} title - The title of the song.
 * @param {string} artist - The artist of the song.
 * @param {string} link - The URL link to the song's audio.
 * @param {boolean} isPlayable - Flag indicating whether the song is playable.
 * 
 * Preconditions:
 * - `title` should be a non-empty string representing the song's title.
 * - `artist` should be a non-empty string representing the song's artist.
 * - `link` should be a valid URL string pointing to the song's audio.
 * - `isPlayable` should be a boolean indicating if the song is playable.
 * - `API_BASE_URL` should be correctly set to the API's base URL.
 * - `getAccessToken` function should be defined and return a valid access token.
 * 
 * Postconditions:
 * - Sends a POST request to add the song to the database.
 * - Returns the response data if the request is successful.
 * - Logs an error and throws it if the request fails.
 * 
 * @returns {Promise<object>} The response data from the API.
 */
export const addSong = async (title, artist, link, isPlayable) => {
    try {
        // Fetch access token
        const token = await getAccessToken();
  
        // Send POST request to add the song
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
  

/**
 * Adds a new song to the database via the admin panel.
 * 
 * @param {string} spotifyLink - The Link to the song.
 * 
 * Preconditions:
 * - `API_BASE_URL` should be correctly set to the API's base URL.
 * - `spotifyLink` should be a non-empty string representing url to the song on spotify.
 * - `getAccessToken` function should be defined and return a valid access token.
 * 
 * Postconditions:
 * - Sends a Get request to use function in the backend.
 * - Returns playable link if successful.
 * - Logs an error and throws it if the request fails.
 * 
 * @returns {Promise<object>} The playable HTML link to the song.
 */
export const getAudioLink = async (spotifyLink) => {
  try {
      const token = await getAccessToken();
      
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

/**
 * Retrieves all songs from the database.
 * 
 * Preconditions:
 * - `API_BASE_URL` should be correctly set to the API's base URL.
 * - `getAccessToken` function should be defined and return a valid access token.
 * 
 * Postconditions:
 * - Sends a GET request to retrieve all songs from the database.
 * - Returns the response data if the request is successful.
 * - Logs an error and throws it if the request fails.
 * 
 * @returns {Promise<Array<object>>} The response data containing an array of song objects.
 */
export const getAllSongs = async () => {
    try {
        // Fetch access token
        const token = await getAccessToken();
        
        // Send GET request to retrieve all songs
        const response = await axios.get(`${API_BASE_URL}/api/songs/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;
    } catch (error) {
        console.error('Error getting songs:', error);
        throw error;
    }
};


/**
 * Changes the playability value of a song in the database.
 * 
 * @param {string} id - The ID of the song to update.
 * @param {object} data - The data to update the song with, typically containing the playability flag.
 * 
 * Preconditions:
 * - `id` should be a valid song ID as a non-empty string.
 * - `data` should be an object with the fields to update (e.g., { isPlayable: boolean }).
 * - `API_BASE_URL` should be correctly set to the API's base URL.
 * - `getAccessToken` function should be defined and return a valid access token.
 * 
 * Postconditions:
 * - Sends a PATCH request to update the playability of the specified song.
 * - Returns the response data if the request is successful.
 * - Logs an error and throws it if the request fails.
 * 
 * @returns {Promise<object>} The response data from the API.
 */
export const switchPlayability = async (id, data) => {
    try {
        // Fetch access token
        const token = await getAccessToken();

        // Send PATCH request to update the song's playability
        const response = await axios.patch(`${API_BASE_URL}/api/songs/${id}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error changing playability:', error);
        throw error;
    }
};



/**
 * Function to sign up a new user.
 * 
 * Preconditions:
 * - The userInfo object must contain valid user details required for signing up.
 * - API_BASE_URL should be defined and correctly pointing to the backend API.
 * 
 * Postconditions:
 * - If successful, the response data from the server containing user details will be returned.
 * - If an error occurs, the error response data will be thrown.
 * 
 * @param {Object} userInfo - An object containing user details for signup (e.g., username, email, password).
 * @returns {Object} The response data from the signup API.
 * @throws {Object} The error response data if the signup fails.
 */
export const signup = async (userInfo) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/signup/`, userInfo);
        
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
  };
  
  /**
   * Function to log in a user.
   * 
   * Preconditions:
   * - The credentials object must contain valid user login details (e.g., username, password).
   * - API_BASE_URL should be defined and correctly pointing to the backend API.
   * - jwtDecode should be available for decoding JWT tokens.
   * - localStorage should be available in the environment for storing tokens.
   * 
   * Postconditions:
   * - If successful, the access and refresh tokens will be stored in localStorage.
   * - The decoded token's expiration time will also be stored in localStorage.
   * - The response data from the server containing tokens will be returned.
   * - If an error occurs, the error response data will be thrown.
   * 
   * @param {Object} credentials - An object containing user login details (e.g., username, password).
   * @returns {Object} The response data from the login API containing tokens.
   * @throws {Object} The error response data if the login fails.
   */
  export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login/`, credentials);
        
        const { access, refresh } = response.data;
  
        const decodedToken = jwtDecode(access);
        const expTime = decodedToken.exp * 1000;     
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('expTime', expTime);
        
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
  };
  

/**
 * Function to check if the access token has expired.
 * 
 * Preconditions:
 * - The expiration time of the access token should be stored in localStorage under the key 'expTime'.
 * - localStorage should be available in the environment.
 * 
 * Postconditions:
 * - Returns true if the access token is expired or no expiration time is found.
 * - Returns false if the access token is still valid.
 * 
 * @returns {boolean} True if the access token is expired or not found, false otherwise.
 */
const isAccessTokenExpired = () => {
    const expirationTime = localStorage.getItem('expTime');
    if (!expirationTime) {
      return true; // No expiration time found, consider expired
    }
    
    const now = new Date().getTime();
    return now > expirationTime; // Return true if current time is after expiration time
  };
  
  /**
   * Function to refresh the access token using the refresh token.
   * 
   * Preconditions:
   * - A valid refresh token should be stored in localStorage under the key 'refreshToken'.
   * - API_BASE_URL should be defined and correctly pointing to the backend API.
   * - jwtDecode should be available for decoding JWT tokens.
   * - localStorage should be available in the environment for storing tokens.
   * 
   * Postconditions:
   * - If successful, the new access and refresh tokens will be stored in localStorage.
   * - The new expiration time of the access token will also be stored in localStorage.
   * - The new access token will be returned.
   * - If an error occurs, an error message will be logged and the error will be thrown.
   * 
   * @returns {string} The new access token.
   * @throws {Error} If there is no refresh token available or the token refresh fails.
   */
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
      localStorage.setItem('expTime', expTime);
  
      return access;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };
  
  /**
   * Function to get the access token.
   * 
   * Preconditions:
   * - The access token and its expiration time should be stored in localStorage.
   * - The refreshAccessToken function should be available for refreshing tokens.
   * 
   * Postconditions:
   * - Returns the current access token if it is valid.
   * - If the access token is expired or not available, attempts to refresh it.
   * - If token refresh is successful, returns the new access token.
   * - If token refresh fails, logs the error and throws it.
   * 
   * @returns {string} The access token.
   * @throws {Error} If the token refresh fails.
   */
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
   * Function to remove access and refresh tokens from localStorage.
   * 
   * Preconditions:
   * - localStorage should be available in the environment.
   * 
   * Postconditions:
   * - The access token, refresh token, and expiration time will be removed from localStorage.
   */
  export const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expTime');
  };
  

/**
 * Function to fetch the top scores from the server.
 * 
 * Preconditions:
 * - The user must be authenticated and have a valid access token stored in localStorage.
 * - The getAccessToken function should be available for retrieving the token.
 * - API_BASE_URL should be defined and correctly pointing to the backend API.
 * 
 * Postconditions:
 * - If successful, the response data containing the top scores will be returned.
 * - If an error occurs, an error message will be logged and the error will be thrown.
 * 
 * @returns {Object} The response data containing the top scores.
 * @throws {Error} If there is an issue with fetching the data.
 */
export const fetchTopScores = async () => {
    try {
      const token = await getAccessToken();
      
      const response = await axios.get(`${API_BASE_URL}/api/top-scores/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response.data);     
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  /**
   * Function to fetch the current user's score from the server.
   * 
   * Preconditions:
   * - The user must be authenticated and have a valid access token stored in localStorage.
   * - The getAccessToken function should be available for retrieving the token.
   * - API_BASE_URL should be defined and correctly pointing to the backend API.
   * 
   * Postconditions:
   * - If successful, the response data containing the user's score will be returned.
   * - If an error occurs, an error message will be logged and the error will be thrown.
   * 
   * @returns {Object} The response data containing the user's score.
   * @throws {Error} If there is an issue with fetching the data.
   */
  export const fetchMyScore = async () => {
    try {
      const token = await getAccessToken();
      
      const response = await axios.get(`${API_BASE_URL}/api/user-score/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response.data);     
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  
/**
 * Function to fetch the user groups from the server.
 * 
 * Preconditions:
 * - The user must be authenticated and have a valid access token stored in localStorage.
 * - The getAccessToken function should be available for retrieving the token.
 * - API_BASE_URL should be defined and correctly pointing to the backend API.
 * 
 * Postconditions:
 * - If successful, the response data containing the user groups will be returned.
 * - If an error occurs, an error message will be logged and the error will be thrown.
 * 
 * @returns {Array} The list of user groups retrieved from the API.
 * @throws {Error} If there is an issue with fetching the data.
 */
export const fetchGroup = async () => {
    try {
      const token = await getAccessToken();
      
      const response = await axios.get(`${API_BASE_URL}/api/user-groups/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response.data);     
      return response.data.groups; // Assuming 'groups' is the key containing the list of user groups
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  