// src/main.tsx
import React from "react";
import ReactDOM from 'react-dom/client';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import MovieListPage from './pages/movie/MovieListPage/MovieListPage.tsx';
import MovieDetailPage from './pages/movie/MovieDetailPage/MovieDetailPage.tsx';
import {AuthProvider} from "./context/AuthContext.tsx";
import UserProfilePage from "./pages/user/UserProfilePage.tsx";
// import './styles/main.css'
import App from "./App.tsx";
import TrainerDetailPage from "./pages/trainer/TrainerDetailPage/TrainerDetailPage.tsx";
import TrainerListPage from "./pages/trainer/TrainerListPage/TrainerListPage.tsx";


// const router = createBrowserRouter(
//     [
//         {
//             path: "/",
//             element: <MovieListPage />,
//         },
//         {
//             path: "/detail/:id",
//             element: <MovieDetailPage />,
//         },
//         {
//             path: "/profile/",
//             element: <UserProfilePage />,
//         },
// ]);



const Main = () => {
    // const [darkMode, setDarkMode] = useState(false);
    //
    // const theme = createTheme({
    //     palette: {
    //         mode: darkMode ? 'dark' : 'light',
    //     },
    // });
    //
    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // };
    //


    return (
        <React.StrictMode>
            <AuthProvider>
                <BrowserRouter>
                        <App>
                            {/*<RouterProvider router={router}/>*/}
                            <Routes>
                                {/*<ThemeProvider theme={theme}>*/}
                                {/*    <CssBaseline/>*/}
                                {/*    <IconButton onClick={toggleDarkMode} sx={{position: 'absolute', top: 16, right: 16}}>*/}
                                {/*        {darkMode ? <LightMode/> : <DarkMode/>}*/}
                                {/*    </IconButton>*/}
                                    <Route path="/" element={<MovieListPage/>}/>
                                    <Route path="/detail/:id" element={<MovieDetailPage/>}/>
                                    <Route path="/profile/" element={<UserProfilePage/>}/>
                                    <Route path="/trainer/" element={<TrainerListPage/>}/>
                                    <Route path="/trainer/:id" element={<TrainerDetailPage/>}/>
                                {/*</ThemeProvider>    */}
                            </Routes>
                        </App>
                </BrowserRouter>
            </AuthProvider>
        </React.StrictMode>
    )
}

export default Main;

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);