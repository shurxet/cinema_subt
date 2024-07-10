import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";
import styles from "./css/MovieList.module.css";


const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');


    return (
    <div className={styles.searchMoviesContainer}>
        <Box mb={4} width={'30%'}>
            <TextField
                fullWidth
                placeholder="Search lessons..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    </div>
    )
}

export default MovieSearch;
