import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import requests
import csv
import time

# Initialize Spotipy with your credentials
SPOTIPY_CLIENT_ID = ''
SPOTIPY_CLIENT_SECRET = ''

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=SPOTIPY_CLIENT_ID,
                                                           client_secret=SPOTIPY_CLIENT_SECRET))

def get_audio_source_from_spotify_url(url):
    track = url.split('?')[0]
    # Extract the track ID from the Spotify URL
    track_id = track.split('/')[-1]

    # Get track details
    track_info = sp.track(track_id)

    # Get audio source
    audio_source = track_info['preview_url']
    
    return audio_source


API_BASE_URL = 'https://d942f94e-31be-4e81-9148-d2f9083f41e0-dev.e1-us-east-azure.choreoapis.dev/melodymystery/backend/v1.0'

def add_song(title, artist, link, is_playable):
    try:
        # Fetch access token
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMDQ0NDU1LCJpYXQiOjE3MzIwNDI2NTUsImp0aSI6IjRmOTYyYTA1MDFjZjRmYzliYWRiMGNjMzM1YjVjYTkyIiwidXNlcl9pZCI6MTAwfQ.jRTG8a8Al_MPF3grCVcXJLEwI_5tvuVGZX_LvBOxEes"
        
        # Send POST request to add the song
        headers = {
            'Authorization': f'Bearer {token}',
        }
        data = {
            'title': title,
            'artist': artist,
            'audio_link': link,
            'isPlayable': is_playable,
        }
        response = requests.post(f'{API_BASE_URL}/api/songs/', json=data, headers=headers)
        response.raise_for_status()  # Raise an exception for 4XX/5XX errors
        
        return response.json()
    except requests.RequestException as error:
        print(f'Error adding song: {error}')
        raise

import csv

def main():
    with open("C:/Users/halot/OneDrive/Desktop/untitledproject/helper/MM.csv", 'r') as file:
        reader = csv.DictReader(file)
        for i, row in enumerate(reader):
            print(f"Processing row {i}: {row}")
            title = row.get('SONG NAME', 'Unknown Title')
            artist = row.get('ARTIST', 'Unknown Artist')
            link = row.get('LINK') or row.get('SPOTIFY LINK')
            is_playable = bool(link)
            
            try:
                source = get_audio_source_from_spotify_url(link)
                if source:
                    print("Audio source found:", source)
                    print(f'Adding song: {title} - {artist}')
                    add_song(title, artist, source, is_playable)
                    time.sleep(secs=10)
            except Exception as e:
                print(f"Error processing {title} - {artist}: {e}")
                continue



main()

