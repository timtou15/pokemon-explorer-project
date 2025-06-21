import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';
import { NavigationProvider } from './context/NavigationContext';
import { PokemonList } from './pages/PokemonList';
import { PokemonDetail } from './pages/PokemonDetail';
import { LanguageToggle } from './components/LanguageToggle';

function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <NavigationProvider>
          <Router>
            <div className="relative">
              <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/pokemon/:id" element={<PokemonDetail />} />
              </Routes>
              <LanguageToggle />
            </div>
          </Router>
        </NavigationProvider>
      </FavoritesProvider>
    </LanguageProvider>
  );
}

export default App;
