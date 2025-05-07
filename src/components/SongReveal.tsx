import { Container, Typography } from "@mui/material";
import { Song } from "../types/song";

type SongRevealProps = {
  song: Song;
}



export const SongReveal = ({ song }: SongRevealProps) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', margin: '16px 0' }}>
      <Typography sx={{
        fontFamily: 'Handjet',
        fontSize: '32px',
        lineHeight: '32px',
      }}>{song.title}</Typography>
    </Container>

  )
}