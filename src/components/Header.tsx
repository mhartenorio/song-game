import { Container, Divider, IconButton, Typography } from "@mui/material";
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import icon from '../../public/icon.svg'
import { colors } from "../theme/colors";
export const Header = () => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src={icon} style={{ width: "auto", height: "2rem" }} />
          <Typography
            component="span"
            sx={{
              fontFamily: 'Crimson Text',
              fontSize: '2rem',
              fontWeight: 600,
              letterSpacing: '-0.08em',
              color: colors.red
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
              marginLeft: '0.2rem',
              color: colors.red
            }}
          >
            Song
          </Typography>
        </div>
        <div>
          <IconButton sx={{ color: colors.red }}>
            <InfoOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: colors.red }}>
            <LeaderboardOutlinedIcon />
          </IconButton>
        </div>
      </Container>
      <Divider variant="middle" sx={{ margin: '0.5rem 0', borderColor: colors.red, borderStyle: 'dashed', borderWidth: 2 }} />
    </>
  );
};