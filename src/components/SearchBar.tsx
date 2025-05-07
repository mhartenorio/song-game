import { Box, TextField, Button, Paper } from "@mui/material";
import { colors } from "../theme/colors";
import { ChevronRightRounded } from "@mui/icons-material";

export const SearchBar = () => {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.background,
        borderTop: `2px solid ${colors.red}`,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
        }}
      >
        <input
          type="text"
          placeholder="Search for a song or submit to skip..."
          style={{
            flexGrow: 1,
            border: 'none',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: colors.background,
            color: colors.red,
            WebkitTextFillColor: colors.red,
            fontSize: '16px',
          }}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            borderRadius: 0,
            // borderBottomLeftRadius: 0,
            backgroundColor: colors.red,
            '&:hover': {
              backgroundColor: '#d62f00',
            }
          }}
        >
          <ChevronRightRounded fontSize="large" fontWeight="bold" />
        </Button>
      </Box>
    </div>
  )
}