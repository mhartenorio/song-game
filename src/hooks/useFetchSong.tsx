import { useEffect, useState } from "react";
import { WikipediaAPI } from "../api/WikipediaAPI";
import { Song } from "../types/song";

export const useFetchSong = () => {
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      const result = await WikipediaAPI.getSong();
      setSong(result);
    };
    fetchSong();
  }, []);

  return { song };
};