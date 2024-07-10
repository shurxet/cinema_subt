import { useState, useEffect } from 'react';
import { fetchMovieDetail, responseMovieDetailType } from "../../services/movie/fetchMovieDetail.tsx";

export const useMovieDetail = (itemId: number | null) => {
  const [movie, setMovie] = useState<responseMovieDetailType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (itemId !== null) {
        try {
          const movieDetail = await fetchMovieDetail(itemId);
          setMovie(movieDetail);
        } catch (err) {
          setError('Failed to fetch movieHooks list.');
          console.error(err);
        }
      } else {
        setError('Invalid movieHooks ID.');
      }
    })();
  }, [itemId]);

  return { movie, error };
};
