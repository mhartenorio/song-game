import { Container, Divider, IconButton, Typography } from "@mui/material";
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
export const Header = () => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem'
        }}>
        <div>
          <Typography
            component="span"
            sx={{
              fontSize: '1.5rem',
            }}
          >
            🌐
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: 'Crimson Text',
              fontSize: '2rem',
              fontWeight: 600,
              letterSpacing: '-0.08em'
            }}
          >
            Wiki
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: 'Handjet',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginLeft: '0.2rem'
            }}
          >
            Song
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: '1.5rem',
              marginLeft: '0.2rem'
            }}
          >
            🧩
          </Typography>
        </div>
        <div>
          <IconButton sx={{ color: 'black' }}>
            <InfoOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: 'black' }}>
            <LeaderboardOutlinedIcon />
          </IconButton>
        </div>
      </Container>
      <Divider variant="middle" sx={{ margin: '0.5rem 0', borderColor: 'black', borderStyle: 'dashed' }} />
    </>
  );
};