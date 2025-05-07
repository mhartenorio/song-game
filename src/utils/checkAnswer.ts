import { Song } from "../types/song";

const simplifyString = (str: string): string => {
  return str.toLowerCase().replace(/[^a-zA-Z ]/g, "")
}

export const checkAnswer = (userGuess: string, song: Song): boolean => {
  return userGuess === song.title || simplifyString(userGuess) === simplifyString(song.title);
}