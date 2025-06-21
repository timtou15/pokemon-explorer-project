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
    'title.filteredPokemon': 'Pokémon Filtrados',
    'title.loadingAll': 'Carregando todos os Pokémon para filtros completos',
    'title.allLoaded': 'Todos os Pokémon carregados',
    'title.filterDescription': 'Agora você pode filtrar entre todos os Pokémon disponíveis',
    
    // Busca
    'search.placeholder': 'Buscar Pokémon por nome ou ID...',
    'search.clear': 'Limpar busca',
    'search.notFound': 'Pokémon não encontrado',
    
    // Estatísticas
    'stats.height': 'Altura',
    'stats.weight': 'Peso',
    'stats.baseExperience': 'Experiência Base',
    'stats.abilities': 'Habilidades',
    'stats.hp': 'HP',
    'stats.attack': 'Ataque',
    'stats.defense': 'Defesa',
    'stats.specialAttack': 'Ataque Especial',
    'stats.specialDefense': 'Defesa Especial',
    'stats.speed': 'Velocidade',
    
    // Mensagens
    'message.noFavorites': 'Nenhum Pokémon favorito ainda!',
    'message.noFavoritesDesc': 'Comece a explorar e adicione alguns aos seus favoritos.',
    'message.pokemonNotFound': 'Pokémon não encontrado',
    'message.errorFetching': 'Erro ao buscar dados',
    'message.noResults': 'Nenhum Pokémon encontrado',
    'message.adjustFilters': 'Tente ajustar os filtros',
    'message.resultsFound': 'resultados encontrados',
    'message.from': 'de',
    'message.loaded': 'carregados',
    'message.loading': 'Carregando',
    'message.of': 'de',
    'message.pokemon': 'Pokémon',
    'message.loadingDescriptions': 'Carregando descrições...',
    
    // Sprites
    'sprite.normal': 'Normal',
    'sprite.shiny': 'Shiny',
    'sprite.dreamWorld': 'Dream World',
    
    // Habilidades
    'ability.hidden': 'Oculta',
    'ability.descriptionNotAvailable': 'Descrição não disponível',
    
    // Filtros
    'filter.filters': 'Filtros',
    'filter.advancedFilters': 'Filtros Avançados',
    'filter.clearAll': 'Limpar Tudo',
    'filter.pokemonTypes': 'Tipos de Pokémon',
    'filter.generations': 'Gerações e Formas',
    'filter.baseStats': 'Estatísticas Base',
    'filter.selected': 'selecionados',
    'filter.minimum': 'Mínimo',
    'filter.maximum': 'Máximo',
    
    // Paginação
    'pagination.previous': 'Página anterior',
    'pagination.next': 'Próxima página',
    
    // Carregamento
    'loading.pokemonData': 'Carregando dados dos Pokémon...',
    'loading.allPokemon': 'Carregando todos os Pokémon...',
    'loading.progress': 'Progresso',
    'loading.complete': 'Carregamento completo concluído',
    
    // Idiomas
    'language.portuguese': 'Português',
    'language.english': 'English',
    'language.current': 'Idioma atual',
    'language.clickToToggle': 'Clique para alternar',
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
    'title.filteredPokemon': 'Filtered Pokémon',
    'title.loadingAll': 'Loading all Pokémon for complete filtering',
    'title.allLoaded': 'All Pokémon loaded',
    'title.filterDescription': 'Now you can filter through all available Pokémon',
    
    // Search
    'search.placeholder': 'Search Pokémon by name or ID...',
    'search.clear': 'Clear search',
    'search.notFound': 'Pokémon not found',
    
    // Stats
    'stats.height': 'Height',
    'stats.weight': 'Weight',
    'stats.baseExperience': 'Base Experience',
    'stats.abilities': 'Abilities',
    'stats.hp': 'HP',
    'stats.attack': 'Attack',
    'stats.defense': 'Defense',
    'stats.specialAttack': 'Special Attack',
    'stats.specialDefense': 'Special Defense',
    'stats.speed': 'Speed',
    
    // Messages
    'message.noFavorites': 'No favorite Pokémon yet!',
    'message.noFavoritesDesc': 'Start exploring and add some to your favorites.',
    'message.pokemonNotFound': 'Pokémon not found',
    'message.errorFetching': 'Error fetching data',
    'message.noResults': 'No Pokémon found',
    'message.adjustFilters': 'Try adjusting the filters',
    'message.resultsFound': 'results found',
    'message.from': 'from',
    'message.loaded': 'loaded',
    'message.loading': 'Loading',
    'message.of': 'of',
    'message.pokemon': 'Pokémon',
    'message.loadingDescriptions': 'Loading descriptions...',
    
    // Sprites
    'sprite.normal': 'Normal',
    'sprite.shiny': 'Shiny',
    'sprite.dreamWorld': 'Dream World',
    
    // Abilities
    'ability.hidden': 'Hidden',
    'ability.descriptionNotAvailable': 'Description not available',
    
    // Filters
    'filter.filters': 'Filters',
    'filter.advancedFilters': 'Advanced Filters',
    'filter.clearAll': 'Clear All',
    'filter.pokemonTypes': 'Pokémon Types',
    'filter.generations': 'Generations & Forms',
    'filter.baseStats': 'Base Statistics',
    'filter.selected': 'selected',
    'filter.minimum': 'Minimum',
    'filter.maximum': 'Maximum',
    
    // Pagination
    'pagination.previous': 'Previous page',
    'pagination.next': 'Next page',
    
    // Loading
    'loading.pokemonData': 'Loading Pokémon data...',
    'loading.allPokemon': 'Loading all Pokémon...',
    'loading.progress': 'Progress',
    'loading.complete': 'Loading complete',
    
    // Languages
    'language.portuguese': 'Português',
    'language.english': 'English',
    'language.current': 'Current language',
    'language.clickToToggle': 'Click to toggle',
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
