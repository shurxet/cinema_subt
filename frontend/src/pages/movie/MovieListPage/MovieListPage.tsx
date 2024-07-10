// src/pages/MovieListPage/MovieListPage.tsx

import {useMovieList} from "../../../hooks/movieHooks/useMovieList.tsx";
import MovieList from "../../../components/movie/MovieList/MovieList.tsx";
import MovieSearch from "../../../components/movie/MovieList/MovieSearch.tsx";
import {Box} from "@mui/material";


function MovieListPage() {
    const { movies, error } = useMovieList();

    if (error) {
        return <div>{error}</div>;
    }

    if (movies.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Box width={'100%'}>
            <MovieSearch/>
            </Box>
            <MovieList response={movies}/>
        </>
    );
}

export default MovieListPage;
