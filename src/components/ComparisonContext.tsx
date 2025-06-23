import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pokemon } from '../types/pokemon';

interface ComparisonContextType {
  comparisonList: Pokemon[];
  addToComparison: (pokemon: Pokemon) => void;
  removeFromComparison: (pokemonId: number) => void;
  clearComparison: () => void;
  isInComparison: (pokemonId: number) => boolean;
  maxComparisons: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

interface ComparisonProviderProps {
  children: ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<Pokemon[]>([]);
  const maxComparisons = 4; // Máximo de 4 Pokémon para comparação

  const addToComparison = (pokemon: Pokemon) => {
    setComparisonList(prev => {
      if (prev.length >= maxComparisons) {
        // Remove o primeiro e adiciona o novo
        return [...prev.slice(1), pokemon];
      }
      if (!prev.find(p => p.id === pokemon.id)) {
        return [...prev, pokemon];
      }
      return prev;
    });
  };

  const removeFromComparison = (pokemonId: number) => {
    setComparisonList(prev => prev.filter(pokemon => pokemon.id !== pokemonId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const isInComparison = (pokemonId: number) => {
    return comparisonList.some(pokemon => pokemon.id === pokemonId);
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonList,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison,
      maxComparisons
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};