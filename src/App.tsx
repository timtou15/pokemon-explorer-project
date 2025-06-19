import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';
import { PokemonList } from './pages/PokemonList';
import { PokemonDetail } from './pages/PokemonDetail';
import { LanguageToggle } from './components/LanguageToggle';

function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
          <LanguageToggle />
        </Router>
      </FavoritesProvider>
    </LanguageProvider>
  );
}

export default App;