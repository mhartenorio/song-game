import { Box } from "@mui/material";
import { colors } from "../theme/colors";

type GuessCirclesProps = {
  hasSolved: boolean;
  guessNumber: number;
}

export const GuessCircles = ({ hasSolved, guessNumber }: GuessCirclesProps) => {
  const totalGuesses = 5;
  
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: 0.5,
      margin: '20px 0'
    }}>
      {Array.from({ length: totalGuesses }).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 
              index < guessNumber 
                ? colors.red 
                : index === guessNumber && hasSolved 
                  ? colors.green
                  : 'transparent',
            border: `2px solid ${
              index === guessNumber 
                ? hasSolved 
                  ? colors.green
                  : colors.red 
                : index < guessNumber 
                  ? colors.red 
                  : 'black'
            }`,
          }}
        />
      ))}
    </Box>
  );
}