import { useState, useEffect } from 'react'
import './App.css'
import { WikipediaAPI } from './api/WikipediaAPI';

function App() {
  const [song, setSong] = useState<{ title: string; artist: string; year: string } | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const result = await WikipediaAPI.getSong();
        console.log(result);
        setSong(result);
      } catch (error) {
        console.error('Error fetching song:', error);
      }
    };
    fetchSong();
  }, []);

  return (
    <>
      <h1>WikiSong</h1>
      <div className="card">
        {song && (
          <div>
            <p>Song: {song.title}</p>
            <p>Artist: {song.artist}</p>
            <p>Year: {song.year}</p>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
