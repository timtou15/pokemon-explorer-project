import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Filter } from 'lucide-react';
import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner, PokemonCardSkeleton } from '../components/LoadingSpinner';
import { usePokemonList, usePokemon } from '../hooks/usePokemon';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { extractPokemonId } from '../utils/helpers';
import { ServiceContainer } from '../services/PokemonService';

const ITEMS_PER_PAGE = 20;

export const PokemonList: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritePokemons, setFavoritePokemons] = useState<any[]>([]);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const { pokemonList, detailedPokemons, loading, error } = usePokemonList(offset, ITEMS_PER_PAGE);

  const pokemonService = ServiceContainer.getInstance().getPokemonService();

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
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
    };

    if (showFavorites) {
      fetchFavoritePokemons();
    }
  }, [favorites, showFavorites]);

  const handleSearch = async (query: string) => {
    setSearchLoading(true);
    setSearchError(null);
    setSearchQuery(query);
    
    try {
      const pokemon = await pokemonService.searchPokemon(query);
      setSearchedPokemon(pokemon);
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : t('search.notFound'));
      setSearchedPokemon(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchedPokemon(null);
    setSearchError(null);
  };

  const handlePokemonClick = (pokemon: any) => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const totalPages = pokemonList ? Math.ceil(pokemonList.count / ITEMS_PER_PAGE) : 1;

  const renderPokemonGrid = (pokemons: any[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={() => handlePokemonClick(pokemon)}
        />
      ))}
    </div>
  );

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('title.pokemonExplorer')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('title.subtitle')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
          
          <div className="flex items-center gap-4">
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

        {searchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-center">{searchError}</p>
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {t('title.allPokemon')}
                </h2>
                {loading ? (
                  renderSkeletons()
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600">{error}</p>
                  </div>
                ) : pokemonList && detailedPokemons.length > 0 ? (
                  <>
                    {renderPokemonGrid(detailedPokemons)}
                    
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      hasNext={!!pokemonList.next}
                      hasPrev={!!pokemonList.previous}
                    />
                  </>
                ) : null}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};