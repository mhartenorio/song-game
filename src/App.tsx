import './App.css'
import { Container } from '@mui/material';
import { useFetchSong } from './hooks/useFetchSong';
import { Header, MusicBox, SearchBar } from './components';

function App() {
  const { song } = useFetchSong();

  return (
    <Container maxWidth="xs" sx={{ width: '100vw', }} disableGutters>
      <div style={{ padding: '16px' }}>
        <Header />
        {song && <MusicBox song={song} guessNumber={0} hasSolved={false} />}
      </div>

      <SearchBar />
    </Container>

  )
}

export default App
