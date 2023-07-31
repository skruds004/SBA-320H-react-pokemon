import React from "react";
import Homepage from "./pages/Homepage";
import PokemonDescriptionpage from "./pages/PokemonDescriptionpage";
import PokemonListpage from "./pages/PokemonListpage";
import PokemonSearchpage from "./pages/PokemonSearchpage";
import Teampage from "./pages/Teampage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokelist" element={<PokemonListpage />} />
        <Route path="/pokesearch" element={<PokemonSearchpage />} />
        <Route path="/pokeinfo/*" element={<PokemonDescriptionpage />} />
        <Route path="/team" element={<Teampage />} />
      </Routes>
    </Router>
  );
}

export default App;
