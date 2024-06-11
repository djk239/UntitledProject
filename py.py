import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Initialize Spotipy with your credentials
SPOTIPY_CLIENT_ID = '92c197ccced844e0afb389001abc394b'
SPOTIPY_CLIENT_SECRET = 'b71745f784df4b2398557d04a71a7378'

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=SPOTIPY_CLIENT_ID,
                                                           client_secret=SPOTIPY_CLIENT_SECRET))

def get_audio_source_from_spotify_url(url):
    # Extract the track ID from the Spotify URL
    track_id = url.split('/')[-1]

    # Get track details
    track_info = sp.track(track_id)

    # Get audio source
    audio_source = track_info['preview_url']
    
    return audio_source

# Example usage
#spotify_url = "https://open.spotify.com/track/1au2UduxcvHfa0fZS3Szci"
spotify_url = "https://open.spotify.com/track/6LxSe8YmdPxy095Ux6znaQ"
audio_source = get_audio_source_from_spotify_url(spotify_url)

if audio_source:
    print("Audio source found:", audio_source)
else:
    print("Audio source not found.")
