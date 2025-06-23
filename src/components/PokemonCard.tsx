import React, { memo } from 'react';
import { Heart, BarChart3 } from 'lucide-react';
import { Pokemon } from '../types/pokemon';
import { useFavorites } from '../context/FavoritesContext';
import { useComparison } from '../context/ComparisonContext';
import { useLanguage } from '../context/LanguageContext';
import { capitalizeFirstLetter, getPokemonTypeColor, formatPokemonId, translatePokemonType } from '../utils/helpers';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = memo(({ pokemon, onClick }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToComparison, removeFromComparison, isInComparison, comparisonList, maxComparisons } = useComparison();
  const { language, t } = useLanguage();
  const favorite = isFavorite(pokemon.id);
  const inComparison = isInComparison(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon.id);
    }
  };

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inComparison) {
      removeFromComparison(pokemon.id);
    } else {
      addToComparison(pokemon);
    }
  };

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = getPokemonTypeColor(primaryType);

  const canAddToComparison = !inComparison && comparisonList.length < maxComparisons;
  const comparisonButtonTitle = inComparison 
    ? t('comparison.removeFromComparison')
    : comparisonList.length >= maxComparisons
    ? `Máximo ${maxComparisons} Pokémon para comparação`
    : t('comparison.addToComparison');

  return (
    <div 
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden border-2 border-gray-100 hover:border-yellow-300"
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${typeColor}15 0%, ${typeColor}05 100%)`
      }}
    >
      {/* Pokéball pattern background */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <div className="w-full h-full rounded-full border-8 border-gray-400 relative">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white border-4 border-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full transition-all duration-150 shadow-md hover:shadow-lg transform hover:scale-110 active:scale-95 ${
            favorite 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
          title={favorite ? t('nav.removeFromFavorites') : t('nav.addToFavorites')}
        >
          <Heart 
            size={16} 
            fill={favorite ? 'currentColor' : 'none'} 
            className={`transition-all duration-150 ${favorite ? 'animate-pulse' : ''}`}
          />
        </button>

        <button
          onClick={handleComparisonClick}
          disabled={!canAddToComparison && !inComparison}
          className={`p-2 rounded-full transition-all duration-150 shadow-md hover:shadow-lg transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            inComparison 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : canAddToComparison
              ? 'bg-white/90 text-gray-400 hover:text-blue-500 hover:bg-white'
              : 'bg-gray-200 text-gray-400'
          }`}
          title={comparisonButtonTitle}
        >
          <BarChart3 
            size={16} 
            className={`transition-all duration-150 ${inComparison ? 'animate-pulse' : ''}`}
          />
        </button>
      </div>

      <div className="p-6">
        <div className="text-center">
          <div className="relative mb-4">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
              {formatPokemonId(pokemon.id)}
            </p>
            <h3 className="text-xl font-bold text-gray-800">
              {capitalizeFirstLetter(pokemon.name)}
            </h3>
            
            <div className="flex justify-center gap-2 mt-3">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md border border-white/20"
                  style={{ backgroundColor: getPokemonTypeColor(type.type.name) }}
                >
                  {translatePokemonType(type.type.name, language)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
