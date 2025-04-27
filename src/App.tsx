import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { getRandomYear, getRandomPosition } from './utils/utils';
import { WikipediaAPI } from './api/WikipediaAPI';

function App() {
  const [count, setCount] = useState(0);
  const [song, setSong] = useState<{ song: string; artist: string; year: string } | null>(null);

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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {song && (
          <div>
            <p>Song: {song.song}</p>
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
