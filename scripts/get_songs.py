import requests
from bs4 import BeautifulSoup
import json
import sys
from typing import List

def get_songs_for_year(year: int) -> List[str]:
    url = f"https://en.wikipedia.org/wiki/Billboard_Year-End_Hot_100_singles_of_{year}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the first wikitable
    table = soup.find('table', {'class': 'wikitable'})
    if not table:
        raise Exception(f"No data found for year {year}")
    
    # Get all rows except header
    rows = table.find_all('tr')[1:]  # Skip header row
    
    # Extract song titles from the second column
    songs = []
    for row in rows:
        cells = row.find_all('td')
        if len(cells) >= 2:
            song_cell = cells[1]
            # Get the text content, removing any reference numbers
            song_title = song_cell.get_text().strip()
            # Remove any quotation marks
            if song_title.startswith('"') and song_title.endswith('"'):
                song_title = song_title[1:-1]
            # Remove any reference numbers in square brackets
            song_title = ''.join(c for c in song_title if c != '[' and c != ']')
            songs.append(song_title)
    
    return songs

def save_to_json(all_songs: List[str]):
    output_file = "songs_2010_2024.json"
    with open(output_file, 'w') as f:
        json.dump(all_songs, f, indent=2)
    print(f"Saved {len(all_songs)} songs to {output_file}")

def main():
    all_songs = []
    start_year = 2010
    end_year = 2024
    
    for year in range(start_year, end_year + 1):
        try:
            print(f"Fetching songs for {year}...")
            songs = get_songs_for_year(year)
            all_songs.extend(songs)
            print(f"Found {len(songs)} songs for {year}")
        except Exception as e:
            print(f"Error fetching songs for {year}: {str(e)}")
            continue
    
    save_to_json(all_songs)

if __name__ == "__main__":
    main() 