// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        h4: {
            marginBottom: '20px',
        },
        body1: {
            marginBottom: '10px',
        },
    },
});

export default theme;