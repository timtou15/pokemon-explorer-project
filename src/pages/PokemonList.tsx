import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Filter, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner, PokemonCardSkeleton } from '../components/LoadingSpinner';
import { AdvancedFilter, FilterOptions } from '../components/AdvancedFilter';
import { usePokemonList } from '../hooks/usePokemon';
import { useAllPokemon } from '../hooks/useAllPokemon';
import { useFilteredPokemon } from '../hooks/useFilteredPokemon';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { useComparison } from '../context/ComparisonContext';
import { ServiceContainer } from '../services/PokemonService';
import { GENERATION_NAMES } from '../types/pokemon';

const ITEMS_PER_PAGE = 20;

export const PokemonList: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { language, t } = useLanguage();
  const { navigationState, updateNavigationState, restoreScrollPosition } = useNavigation();
  const { comparisonList } = useComparison();
  
  const [currentPage, setCurrentPage] = useState(navigationState.currentPage);
  const [searchQuery, setSearchQuery] = useState(navigationState.searchQuery);
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(navigationState.showFavorites);
  const [favoritePokemons, setFavoritePokemons] = useState<any[]>([]);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(navigationState.filters);
  const [showIdExplanation, setShowIdExplanation] = useState(false);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const { pokemonList, detailedPokemons, loading: paginationLoading, error } = usePokemonList(offset, ITEMS_PER_PAGE);
  const { allPokemons, loading: allLoading, isLoaded, progress, exactTotal } = useAllPokemon();
  
  const hasActiveFilters = filters.types.length > 0 || filters.generations.length > 0 || 
    Object.values(filters.stats).some(stat => stat.min > 0 || stat.max < 255);

  const pokemonsToFilter = hasActiveFilters ? allPokemons : detailedPokemons;
  const filteredPokemons = useFilteredPokemon(pokemonsToFilter, filters);

  const filteredPaginatedPokemons = useMemo(() => {
    return hasActiveFilters ? 
      filteredPokemons.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) :
      filteredPokemons;
  }, [hasActiveFilters, filteredPokemons, currentPage]);

  const totalFilteredPages = hasActiveFilters ? 
    Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE) : 
    (pokemonList ? Math.ceil(pokemonList.count / ITEMS_PER_PAGE) : 1);

  const pokemonService = ServiceContainer.getInstance().getPokemonService();

  // Detectar se estamos na página onde aparece o gap (página 52)
  const isOnGapPage = currentPage === 52 && !hasActiveFilters && !showFavorites && !searchQuery;
  const hasSpecialForms = detailedPokemons.some(pokemon => pokemon.id >= 10001);

  // Restaurar posição de scroll quando voltar
  useEffect(() => {
    if (navigationState.scrollPosition > 0) {
      restoreScrollPosition();
    }
  }, []);

  // Salvar estado quando mudar
  useEffect(() => {
    updateNavigationState({
      currentPage,
      searchQuery,
      showFavorites,
      filters
    });
  }, [currentPage, searchQuery, showFavorites, filters]);

  const fetchFavoritePokemons = useCallback(async () => {
    if (favorites.length > 0) {
      try {
        const pokemonPromises = favorites.map(id => pokemonService.getPokemon(id));
        const pokemons = await Promise.all(pokemonPromises);
        setFavoritePokemons(pokemons);
      } catch (error) {
        console.error('Erro ao buscar Pokémon favoritos:', error);
      }
    } else {
      setFavoritePokemons([]);
    }
  }, [favorites]);

  useEffect(() => {
    if (showFavorites) {
      fetchFavoritePokemons();
    }
  }, [showFavorites, fetchFavoritePokemons]);

  // Check if query is a generation name
  const isGenerationQuery = useCallback((query: string): boolean => {
    const normalizedQuery = query.toLowerCase().trim();
    return GENERATION_NAMES.some(genName => 
      normalizedQuery.includes(genName) || 
      normalizedQuery === genName
    );
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setSearchLoading(true);
    setSearchError(null);
    setSearchQuery(query);
    
    // Check if the query is a generation name
    if (isGenerationQuery(query)) {
      setSearchError(t('search.useFiltersForGeneration'));
      setSearchedPokemon(null);
      setSearchLoading(false);
      return;
    }
    
    try {
      const pokemon = await pokemonService.searchPokemon(query);
      setSearchedPokemon(pokemon);
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : t('search.notFound'));
      setSearchedPokemon(null);
    } finally {
      setSearchLoading(false);
    }
  }, [t, isGenerationQuery]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchedPokemon(null);
    setSearchError(null);
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    const emptyFilters = {
      types: [],
      generations: [],
      stats: {
        hp: { min: 0, max: 255 },
        attack: { min: 0, max: 255 },
        defense: { min: 0, max: 255 },
        speed: { min: 0, max: 255 },
      }
    };
    setFilters(emptyFilters);
    setCurrentPage(1);
  }, []);

  const handlePokemonClick = useCallback((pokemon: any) => {
    // Salvar posição de scroll antes de navegar
    updateNavigationState({
      currentPage,
      searchQuery,
      showFavorites,
      filters,
      scrollPosition: window.scrollY
    });
    navigate(`/pokemon/${pokemon.id}`);
  }, [navigate, currentPage, searchQuery, showFavorites, filters, updateNavigationState]);

  const renderPokemonGrid = useCallback((pokemons: any[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={() => handlePokemonClick(pokemon)}
        />
      ))}
    </div>
  ), [handlePokemonClick]);

  const renderSkeletons = useCallback(() => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  ), []);

  const isLoadingContent = hasActiveFilters ? allLoading : paginationLoading;
  const currentPokemons = hasActiveFilters ? filteredPaginatedPokemons : detailedPokemons;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className={`container mx-auto px-4 py-8 ${comparisonList.length > 0 ? 'pb-32' : ''}`}>
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('title.pokemonExplorer')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('title.subtitle')}
          </p>
          
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-blue-800">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="font-semibold text-lg">
                {language === 'pt' ? 
                  `Total de ${exactTotal ? exactTotal.toLocaleString() : '10.277+'} Pokémon na PokéAPI` : 
                  `Total of ${exactTotal ? exactTotal.toLocaleString() : '10,277+'} Pokémon in PokéAPI`}
              </p>
            </div>
            <p className="text-blue-600 text-sm mt-2">
              {language === 'pt' ? 
                'Incluindo todas as gerações, formas especiais, mega evoluções e variantes regionais' : 
                'Including all generations, special forms, mega evolutions and regional variants'}
            </p>
          </div>
        </div>

        {/* Explicação sobre IDs - mais compacta */}
        {(isOnGapPage || hasSpecialForms) && (
          <div className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="text-purple-600 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <button
                  onClick={() => setShowIdExplanation(!showIdExplanation)}
                  className="flex items-center gap-2 text-purple-800 hover:text-purple-900 transition-colors"
                >
                  <h3 className="font-bold">
                    {language === 'pt' ? 
                      'Por que os IDs saltam de #1025 para #10001?' : 
                      'Why do IDs jump from #1025 to #10001?'}
                  </h3>
                  {showIdExplanation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {showIdExplanation && (
                  <div className="mt-3 text-purple-700 text-sm space-y-2">
                    <p>
                      {language === 'pt' ? 
                        '• Pokémon #1-1025: Pokémon principais das 9 gerações oficiais' : 
                        '• Pokémon #1-1025: Main Pokémon from the 9 official generations'}
                    </p>
                    <p>
                      {language === 'pt' ? 
                        '• Pokémon #10001+: Formas especiais, variantes regionais, mega evoluções' : 
                        '• Pokémon #10001+: Special forms, regional variants, mega evolutions'}
                    </p>
                    <p className="font-medium">
                      {language === 'pt' ? 
                        'Exemplos: #10001 Deoxys (Ataque), #10002 Deoxys (Defesa), #10003 Deoxys (Velocidade)' : 
                        'Examples: #10001 Deoxys (Attack), #10002 Deoxys (Defense), #10003 Deoxys (Speed)'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex justify-center w-full lg:w-auto">
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
          </div>
          
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <AdvancedFilter
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isOpen={showAdvancedFilter}
              onToggle={() => setShowAdvancedFilter(!showAdvancedFilter)}
              currentFilters={filters}
            />
            
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                showFavorites
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Heart size={18} fill={showFavorites ? 'currentColor' : 'none'} />
              {t('nav.favorites')} ({favorites.length})
            </button>
          </div>
        </div>

        {/* Status de carregamento otimizado */}
        {allLoading && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <div className="flex-1">
                <p className="text-blue-800 font-bold">
                  {t('title.loadingAll')}
                </p>
                <p className="text-blue-700 text-sm">
                  {language === 'pt' ? 
                    `${progress.current.toLocaleString()} de ${exactTotal ? exactTotal.toLocaleString() : '10.277+'} Pokémon` : 
                    `${progress.current.toLocaleString()} of ${exactTotal ? exactTotal.toLocaleString() : '10,277+'} Pokémon`}
                </p>
                {progress.total > 0 && (
                  <div className="mt-2">
                    <div className="bg-blue-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                        style={{ width: `${(progress.current / progress.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      {((progress.current / progress.total) * 100).toFixed(1)}% concluído
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Status de carregamento completo */}
        {isLoaded && !allLoading && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <p className="text-green-800 font-bold">
                {language === 'pt' ? 
                  `${exactTotal ? exactTotal.toLocaleString() : '10.277+'} Pokémon carregados - Filtros completos disponíveis` : 
                  `${exactTotal ? exactTotal.toLocaleString() : '10,277+'} Pokémon loaded - Complete filtering available`}
              </p>
            </div>
          </div>
        )}

        {searchError && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Filter className="text-orange-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-orange-800 font-medium">{searchError}</p>
                <p className="text-orange-600 text-sm mt-1">
                  {t('search.generationSearchNotSupported')}
                </p>
              </div>
            </div>
          </div>
        )}

        {searchLoading && <LoadingSpinner />}

        {searchedPokemon && !searchLoading && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('title.searchResults')}</h2>
            {renderPokemonGrid([searchedPokemon])}
          </div>
        )}

        {showFavorites ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {t('title.yourFavorites')} ({favorites.length})
            </h2>
            {favoritePokemons.length > 0 ? (
              renderPokemonGrid(favoritePokemons)
            ) : (
              <div className="text-center py-12">
                <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">{t('message.noFavorites')}</p>
                <p className="text-gray-400">{t('message.noFavoritesDesc')}</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {!searchQuery && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {hasActiveFilters ? t('title.filteredPokemon') : t('title.allPokemon')}
                  </h2>
                  {hasActiveFilters && (
                    <div className="text-sm text-gray-600">
                      <span className="font-bold text-lg text-blue-600">
                        {filteredPokemons.length.toLocaleString()}
                      </span>
                      <span className="ml-1">
                        {t('message.resultsFound')}
                      </span>
                      {isLoaded && (
                        <span className="ml-2 text-green-600 font-medium">
                          ({t('message.from')} {exactTotal ? exactTotal.toLocaleString() : '10.277+'} {t('message.loaded')})
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {isLoadingContent ? (
                  renderSkeletons()
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600">{error}</p>
                  </div>
                ) : currentPokemons.length > 0 ? (
                  <>
                    {renderPokemonGrid(currentPokemons)}
                    
                    <div className="flex justify-center mt-12">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalFilteredPages}
                        onPageChange={setCurrentPage}
                        hasNext={hasActiveFilters ? currentPage < totalFilteredPages : !!pokemonList?.next}
                        hasPrev={hasActiveFilters ? currentPage > 1 : !!pokemonList?.previous}
                      />
                    </div>
                  </>
                ) : hasActiveFilters ? (
                  <div className="text-center py-12">
                    <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">{t('message.noResults')}</p>
                    <p className="text-gray-400">{t('message.adjustFilters')}</p>
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
