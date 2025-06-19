import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  pt: {
    // Navegação
    'nav.backToList': 'Voltar à Lista',
    'nav.addToFavorites': 'Adicionar aos Favoritos',
    'nav.removeFromFavorites': 'Remover dos Favoritos',
    'nav.favorites': 'Favoritos',
    'nav.goBack': 'Voltar',
    
    // Títulos
    'title.pokemonExplorer': 'Explorador Pokémon',
    'title.subtitle': 'Descubra e explore o incrível mundo dos Pokémon',
    'title.searchResults': 'Resultados da Busca',
    'title.yourFavorites': 'Seus Pokémon Favoritos',
    'title.allPokemon': 'Todos os Pokémon',
    'title.physicalStats': 'Estatísticas Físicas',
    'title.baseStats': 'Estatísticas Base',
    'title.abilities': 'Habilidades',
    'title.sprites': 'Sprites',
    'title.totalBaseStats': 'Total de Estatísticas Base',
    
    // Busca
    'search.placeholder': 'Buscar Pokémon por nome ou ID...',
    'search.clear': 'Limpar busca',
    'search.notFound': 'Pokémon não encontrado',
    
    // Estatísticas
    'stats.height': 'Altura',
    'stats.weight': 'Peso',
    'stats.baseExperience': 'Experiência Base',
    'stats.abilities': 'Habilidades',
    
    // Mensagens
    'message.noFavorites': 'Nenhum Pokémon favorito ainda!',
    'message.noFavoritesDesc': 'Comece a explorar e adicione alguns aos seus favoritos.',
    'message.pokemonNotFound': 'Pokémon não encontrado',
    'message.errorFetching': 'Erro ao buscar dados',
    
    // Sprites
    'sprite.normal': 'Normal',
    'sprite.shiny': 'Shiny',
    'sprite.dreamWorld': 'Dream World',
    
    // Habilidades
    'ability.hidden': 'Oculta',
    
    // Idiomas
    'language.portuguese': 'Português',
    'language.english': 'English',
  },
  en: {
    // Navigation
    'nav.backToList': 'Back to List',
    'nav.addToFavorites': 'Add to Favorites',
    'nav.removeFromFavorites': 'Remove from Favorites',
    'nav.favorites': 'Favorites',
    'nav.goBack': 'Go Back',
    
    // Titles
    'title.pokemonExplorer': 'Pokémon Explorer',
    'title.subtitle': 'Discover and explore the amazing world of Pokémon',
    'title.searchResults': 'Search Results',
    'title.yourFavorites': 'Your Favorite Pokémon',
    'title.allPokemon': 'All Pokémon',
    'title.physicalStats': 'Physical Stats',
    'title.baseStats': 'Base Stats',
    'title.abilities': 'Abilities',
    'title.sprites': 'Sprites',
    'title.totalBaseStats': 'Total Base Stats',
    
    // Search
    'search.placeholder': 'Search Pokémon by name or ID...',
    'search.clear': 'Clear search',
    'search.notFound': 'Pokémon not found',
    
    // Stats
    'stats.height': 'Height',
    'stats.weight': 'Weight',
    'stats.baseExperience': 'Base Experience',
    'stats.abilities': 'Abilities',
    
    // Messages
    'message.noFavorites': 'No favorite Pokémon yet!',
    'message.noFavoritesDesc': 'Start exploring and add some to your favorites.',
    'message.pokemonNotFound': 'Pokémon not found',
    'message.errorFetching': 'Error fetching data',
    
    // Sprites
    'sprite.normal': 'Normal',
    'sprite.shiny': 'Shiny',
    'sprite.dreamWorld': 'Dream World',
    
    // Abilities
    'ability.hidden': 'Hidden',
    
    // Languages
    'language.portuguese': 'Português',
    'language.english': 'English',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('pokemon-language') as Language;
    if (storedLanguage && (storedLanguage === 'pt' || storedLanguage === 'en')) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('pokemon-language', lang);
    // Atualizar o atributo lang do HTML
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};