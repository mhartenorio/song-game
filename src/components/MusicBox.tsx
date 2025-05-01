import { Box, Container, Typography } from "@mui/material";
import { Song } from "../types/song";
import { colors } from "../theme/colors";
import { ImagePixelated, ElementPixelated } from "react-pixelate"

const PLACEHOLDER_TEXT = '//////////////////';
const PIXEL_SIZE = [25, 20, 15, 10, 5];

type MusicBoxProps = {
  song: Song;
  guessNumber: number;
  hasSolved: boolean;
};

const styles = {
  header: {
    fontFamily: 'Handjet',
    fontSize: '32px',
    lineHeight: '32px',
  },
  songInfoBox: {
    backgroundColor: colors.background,
    padding: '16px',
    borderRadius: '8px',
    border: `1px dashed black`,
  }
}

const TopHitTextHeader = (song: Song) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', margin: '16px 0' }}>
      <Typography sx={{ ...styles.header }}>
        Today's song is the {" "}
        <Typography component="span" sx={{ ...styles.header, fontWeight: 'bold', color: colors.secondary }}>
          Top {song.chartPosition} {" "}
        </Typography>
        hit of {" "}
        <Typography component="span" sx={{ ...styles.header, fontWeight: 'bold', color: colors.secondary }}>
          {song.year}.
        </Typography>
      </Typography>
    </Container>
  )
};

const SectionText = ({title, text, shouldShow}: {title: string, text: string, shouldShow: boolean}) => {
  return (
    <div style={{marginBottom: '8px'}}>
      <Typography sx={{fontFamily: 'Handjet', fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase'}}>
        {title}
      </Typography>
      <Typography sx={{marginTop: "-4px"}}>
        {shouldShow ? text : PLACEHOLDER_TEXT}
      </Typography>
    </div>
  )
};

const SongInfo = ({ song, guessNumber, hasSolved }: MusicBoxProps) => {
  hasSolved=true;

  return (
    <Container sx={{ ...styles.songInfoBox }}>
      {song.image && <ImagePixelated src={song.image} pixelSize={PIXEL_SIZE[guessNumber]} width={200} height={200} />}
      <SectionText title="Artist" text={"Enrique Iglesias"} shouldShow={true} />
      <SectionText title="From the album / ep" text={song.album || 'This song is not from an album'} shouldShow={!!song.album && (hasSolved || guessNumber > 3)} />
      <SectionText title="Genre" text={song.genre || 'No info available'} shouldShow={!!song.genre && hasSolved} />
      <SectionText title="Release date" text={song.releaseDate || 'No info available'} shouldShow={!!song.releaseDate && hasSolved} />
      <SectionText title="Record Label" text={song.label || 'No info available'} shouldShow={!!song.label && hasSolved} />
      <SectionText title="Songwriters" text={song.songwriters || 'No info available'} shouldShow={!!song.songwriters && hasSolved} />
      <SectionText title="Producers" text={song.producers || 'No info available'} shouldShow={!!song.producers && hasSolved} />
    </Container>
  )
};

export const MusicBox = ({ song, guessNumber, hasSolved }: MusicBoxProps) => {
  return (
    <div>
      <TopHitTextHeader {...song} />
      <SongInfo song={song} guessNumber={guessNumber} hasSolved={hasSolved} />
    </div>
  );
};