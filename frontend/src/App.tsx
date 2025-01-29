import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/containers/Artists.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Albums from "./features/albums/Albums.tsx";
import Tracks from "./features/tracks/Tracks.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import TrackHistory from "./features/trackHistory/TrackHistory.tsx";
import ArtistForm from "./features/artists/components/ArtistForm.tsx";
import ProtectedRoute from "./components/ProtetectedRoute/ProtectedRoute.tsx";
import {selectUser} from "./features/users/userSlice.ts";
import {useAppSelector} from "./app/hooks.ts";


const App = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Artists/>}/>
                        <Route path='/album/:id' element={<Albums/>}/>
                        <Route path='/tracks/:id' element={<Tracks/>}/>
                        <Route path='/trackHistory' element={<TrackHistory/>}/>
                        <Route path='/register' element={<RegisterPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='artist/new' element={
                            <ProtectedRoute isAllowed={user &&  user.role === "admin" || user && user.role === 'user'}>
                                <ArtistForm/>
                            </ProtectedRoute>
                        }/>
                        <Route path="*" element={<h1>Not found</h1>}/>
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App
