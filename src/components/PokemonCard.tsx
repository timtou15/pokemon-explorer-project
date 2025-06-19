import React from 'react';
import { Heart } from 'lucide-react';
import { Pokemon } from '../types/pokemon';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { capitalizeFirstLetter, getPokemonTypeColor, formatPokemonId, translatePokemonType } from '../utils/helpers';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { language, t } = useLanguage();
  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon.id);
    }
  };

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = getPokemonTypeColor(primaryType);

  return (
    <div 
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${typeColor}15 0%, ${typeColor}05 100%)`
      }}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full transition-all duration-200 ${
            favorite 
              ? 'bg-red-500 text-white shadow-md' 
              : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
          title={favorite ? t('nav.removeFromFavorites') : t('nav.addToFavorites')}
        >
          <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
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
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">
              {formatPokemonId(pokemon.id)}
            </p>
            <h3 className="text-xl font-bold text-gray-800">
              {capitalizeFirstLetter(pokemon.name)}
            </h3>
            
            <div className="flex justify-center gap-2 mt-3">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
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
};