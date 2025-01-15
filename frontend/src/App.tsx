import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Albums from "./features/albums/Albums.tsx";
import Tracks from "./features/tracks/Tracks.tsx";


const App = () => {

  return (
      <>
        <CssBaseline/>
          <header>
              <AppToolbar />
          </header>
        <main>
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<Artists/>}/>
              <Route path='/album/:id' element={<Albums/>}/>
                <Route path='/tracks/:id' element={<Tracks/>}/>
              <Route path="*" element={<h1>Not found</h1>}/>
            </Routes>
          </Container>
        </main>
      </>
  )
};

export default App
