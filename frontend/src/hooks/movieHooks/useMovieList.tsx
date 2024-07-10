import {useEffect, useState} from "react";
import {fetchMovieList, responseMovieListType} from "../../services/movie/fetchMovieList.tsx";


export const useMovieList = () => {
    const [movies, setMovies] = useState<responseMovieListType>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const movieList = await fetchMovieList();
                setMovies(movieList);
            } catch (err) {
                setError('Failed to fetch movieHooks list.');
                console.error(err);
            }
        })();
    }, []);

    return { movies, error };
};
