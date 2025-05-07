import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { Song } from "../types/song";
import { colors } from "../theme/colors";
import { ImagePixelated, ElementPixelated } from "react-pixelate"
import { SongReveal } from "./SongReveal";

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
    color: colors.red
  },
  songInfoBox: {
    // padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

const TopHitTextHeader = (song: Song) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', margin: '16px 0' }}>
      <Typography sx={{ ...styles.header }}>
        Today's song is the {" "}
        <Typography component="span" sx={{ ...styles.header, fontWeight: 'bold', }}>
          Top {song.chartPosition} {" "}
        </Typography>
        hit of {" "}
        <Typography component="span" sx={{ ...styles.header, fontWeight: 'bold', }}>
          {song.year}.
        </Typography>
      </Typography>
    </Container>
  )
};

const SectionText = ({ title, text, shouldShow }: { title: string, text: string, shouldShow: boolean }) => {
  // if (!shouldShow) return <></>
  return (
    <div style={{ marginBottom: '8px' }}>
      <Typography sx={{ fontFamily: 'Handjet', fontSize: '18px', fontWeight: '500', textTransform: 'uppercase', color: colors.red }}>
        {title}
      </Typography>
      <Typography sx={{ marginTop: "-4px" }}>
        {shouldShow ? text : PLACEHOLDER_TEXT}
      </Typography>
    </div>
  )
};

const SongInfo = ({ song, guessNumber, hasSolved }: MusicBoxProps) => {

  return (
    <Container sx={{ ...styles.songInfoBox }}>
      {song.image && <ImagePixelated src={song.image} pixelSize={hasSolved || guessNumber > 4 ? 0 : PIXEL_SIZE[guessNumber]} width={200} height={200} />}
      <Grid container alignItems={'center'} margin={1}>
        <Grid size={9}>
          <Divider variant="middle" sx={{ margin: '0.5rem 0', borderColor: colors.red, borderStyle: 'solid' }} />
        </Grid>
        <Grid size={3} textAlign={'end'}>
          <Typography sx={{ fontFamily: 'Handjet', fontSize: '18px', fontWeight: '500', textTransform: 'uppercase', color: colors.red }}>
            0:00 / {song.length?.slice(0,5)}
          </Typography>
        </Grid>
      </Grid>
      <SectionText title="Artist" text={song.artist} shouldShow={hasSolved || guessNumber > 3} />
      <SectionText title="From the album / ep" text={song.album || 'This song is not from an album'} shouldShow={hasSolved || guessNumber > 1} />
      <SectionText title="Genre" text={song.genre || 'No info available'} shouldShow={true} />
      <SectionText title="Release date" text={song.releaseDate || 'No info available'} shouldShow={true} />
      <SectionText title="Record Label" text={song.label || 'No info available'} shouldShow={hasSolved || guessNumber > 0} />
      <SectionText title="Songwriters" text={song.songwriters || 'No info available'} shouldShow={hasSolved || guessNumber > 2} />
      <SectionText title="Producers" text={song.producers || 'No info available'} shouldShow={hasSolved || guessNumber > 2} />
    </Container>
  )
};

export const MusicBox = ({ song, guessNumber, hasSolved }: MusicBoxProps) => {
  return (
    <div>
      <TopHitTextHeader {...song} />
      {hasSolved || guessNumber > 4 && <SongReveal song={song} />}
      <SongInfo song={song} guessNumber={guessNumber} hasSolved={hasSolved} />
    </div>
  );
};