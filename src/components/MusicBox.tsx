import { Container, Typography } from "@mui/material";
import { Song } from "../types/song";
import { colors } from "../theme/colors";

type MusicBoxProps = {
  song: Song;
  guessNumber: number;
  hasSolved: boolean;
};

const PLACEHOLDER_TEXT = '//////////////////';

const TopHitTextHeader = (song: Song) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Handjet' }}>
        Today's song is the {" "}<br/>
        <Typography variant="h4" component="span" sx={{ fontFamily: 'Handjet', fontWeight: 'bold', color: colors.secondary }}>
          Top {song.chartPosition} {" "}
        </Typography>
        hit of {" "}
        <Typography variant="h4" component="span" sx={{ fontFamily: 'Handjet', fontWeight: 'bold', color: colors.secondary }}>
          {song.year}.
        </Typography>
      </Typography>
    </Container>
  )
};

export const MusicBox = ({ song, guessNumber, hasSolved }: MusicBoxProps) => {
  return (
    <div style={{ margin: '16px 0'}}>
      <TopHitTextHeader {...song} />

      <p>Song: {song.title}</p>
      <p>Artist: {song.artist}</p>
      <p>Year: {song.year}</p>
    </div>
  );
};