import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';
import { NavigationProvider } from './context/NavigationContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { PokemonList } from './pages/PokemonList';
import { PokemonDetail } from './pages/PokemonDetail';
import { LanguageToggle } from './components/LanguageToggle';
import { ComparisonPanel } from './components/ComparisonPanel';

function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <ComparisonProvider>
          <NavigationProvider>
            <Router>
              <div className="relative">
                <Routes>
                  <Route path="/" element={<PokemonList />} />
                  <Route path="/pokemon/:id" element={<PokemonDetail />} />
                </Routes>
                <LanguageToggle />
                <ComparisonPanel />
              </div>
            </Router>
          </NavigationProvider>
        </ComparisonProvider>
      </FavoritesProvider>
    </LanguageProvider>
  );
}

export default App;
