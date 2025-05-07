import './App.css'
import { Container } from '@mui/material';
import { useFetchSong } from './hooks/useFetchSong';
import { Header, MusicBox, SearchBar, GuessCircles } from './components';
import { useState } from 'react';

function App() {
  const { song } = useFetchSong();
  const [guessNumber, setGuessNumber] = useState(0);
  const [hasSolved, setHasSolved] = useState(false);

  if (!song) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Container maxWidth="xs" sx={{ width: '100vw', }} disableGutters>
      <div style={{ padding: '16px' }}>
        <Header />
        <GuessCircles hasSolved={hasSolved} guessNumber={guessNumber} />
        {song && <MusicBox song={song} guessNumber={guessNumber} hasSolved={hasSolved} />}
      </div>

      <SearchBar setGuessNumber={setGuessNumber} setHasSolved={setHasSolved} song={song} />
    </Container>

  )
}

export default App
