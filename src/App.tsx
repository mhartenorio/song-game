import './App.css'
import { Container } from '@mui/material';
import { Header } from './components/Header';
import { MusicBox } from './components/MusicBox';
import { useFetchSong } from './hooks/useFetchSong';

function App() {
  const { song } = useFetchSong();

  return (
    <Container maxWidth="xs" sx={{ width: '100vw', height: '100vh' }} disableGutters>
      <Header />
      {song && <MusicBox song={song} guessNumber={0} hasSolved={false} />}
    </Container>

  )
}

export default App
