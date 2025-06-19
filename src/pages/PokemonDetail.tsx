import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Ruler, Weight, Zap, Activity } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { StatBar } from '../components/StatBar';
import { usePokemon } from '../hooks/usePokemon';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { ServiceContainer } from '../services/PokemonService';
import { 
  capitalizeFirstLetter, 
  getPokemonTypeColor, 
  formatPokemonId, 
  formatHeight, 
  formatWeight,
  translatePokemonType,
  getFlavorText,
  getGenus
} from '../utils/helpers';

export const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, species, loading, error } = usePokemon(id!);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { language, t } = useLanguage();
  const [abilityDescriptions, setAbilityDescriptions] = useState<{[key: string]: string}>({});
  const [loadingAbilities, setLoadingAbilities] = useState(false);

  const pokemonService = ServiceContainer.getInstance().getPokemonService();

  useEffect(() => {
    const fetchAbilityDescriptions = async () => {
      if (pokemon?.abilities) {
        setLoadingAbilities(true);
        const descriptions: {[key: string]: string} = {};
        
        // Buscar descrições sequencialmente para evitar sobrecarga da API
        for (const ability of pokemon.abilities) {
          try {
            const description = await pokemonService.getAbilityDescription(
              ability.ability.name, 
              language
            );
            descriptions[ability.ability.name] = description;
            
            // Pequeno delay para não sobrecarregar a API
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.error(`Erro ao buscar descrição da habilidade ${ability.ability.name}:`, error);
            descriptions[ability.ability.name] = '';
          }
        }
        
        setAbilityDescriptions(descriptions);
        setLoadingAbilities(false);
      }
    };

    fetchAbilityDescriptions();
  }, [pokemon, language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-red-600 text-lg">{error || t('message.pokemonNotFound')}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t('nav.goBack')}
          </button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(pokemon.id);
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = getPokemonTypeColor(primaryType);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon.id);
    }
  };

  // Obter textos com fallbacks seguros, passando o nome do Pokémon
  const flavorText = getFlavorText(species, language, pokemon.name);
  const genus = getGenus(species, language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            {t('nav.backToList')}
          </button>
          
          <button
            onClick={handleFavoriteClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              favorite 
                ? 'bg-red-500 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
            {favorite ? t('nav.removeFromFavorites') : t('nav.addToFavorites')}
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Imagem e Informações Básicas */}
          <div className="space-y-6">
            <div 
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
              style={{
                background: `linear-gradient(135deg, ${typeColor}15 0%, ${typeColor}05 100%)`
              }}
            >
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  {formatPokemonId(pokemon.id)}
                </p>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {capitalizeFirstLetter(pokemon.name)}
                </h1>
                {genus && (
                  <p className="text-gray-600">{genus}</p>
                )}
              </div>

              <div className="relative mb-6">
                <img
                  src={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-48 h-48 mx-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== pokemon.sprites.front_default) {
                      target.src = pokemon.sprites.front_default;
                    }
                  }}
                />
              </div>

              <div className="flex justify-center gap-2 mb-6">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md"
                    style={{ backgroundColor: getPokemonTypeColor(type.type.name) }}
                  >
                    {translatePokemonType(type.type.name, language)}
                  </span>
                ))}
              </div>

              {flavorText && (
                <p className="text-gray-700 leading-relaxed italic">
                  "{flavorText}"
                </p>
              )}
            </div>

            {/* Estatísticas Físicas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('title.physicalStats')}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Ruler className="text-blue-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">{t('stats.height')}</p>
                    <p className="text-lg font-semibold">{formatHeight(pokemon.height)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Weight className="text-green-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">{t('stats.weight')}</p>
                    <p className="text-lg font-semibold">{formatWeight(pokemon.weight)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Zap className="text-yellow-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">{t('stats.baseExperience')}</p>
                    <p className="text-lg font-semibold">{pokemon.base_experience || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Activity className="text-purple-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">{t('stats.abilities')}</p>
                    <p className="text-lg font-semibold">{pokemon.abilities.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Estatísticas Detalhadas */}
          <div className="space-y-6">
            {/* Estatísticas Base */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('title.baseStats')}</h2>
              <div className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <StatBar
                    key={stat.stat.name}
                    label={stat.stat.name}
                    value={stat.base_stat}
                  />
                ))}
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('title.totalBaseStats')}</p>
                <p className="text-2xl font-bold text-gray-800">
                  {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                </p>
              </div>
            </div>

            {/* Habilidades */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('title.abilities')}</h2>
              {loadingAbilities && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-600">Carregando descrições...</span>
                </div>
              )}
              <div className="space-y-3">
                {pokemon.abilities.map((ability, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      ability.is_hidden 
                        ? 'border-purple-200 bg-purple-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {capitalizeFirstLetter(ability.ability.name.replace('-', ' '))}
                      </h3>
                      {ability.is_hidden && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {t('ability.hidden')}
                        </span>
                      )}
                    </div>
                    {abilityDescriptions[ability.ability.name] && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {abilityDescriptions[ability.ability.name]}
                      </p>
                    )}
                    {!abilityDescriptions[ability.ability.name] && !loadingAbilities && (
                      <p className="text-sm text-gray-400 italic">
                        {language === 'pt' ? 'Descrição não disponível' : 'Description not available'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Imagens Adicionais */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('title.sprites')}</h2>
              <div className="grid grid-cols-2 gap-4">
                {pokemon.sprites.front_default && (
                  <div className="text-center">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={`${pokemon.name} normal`}
                      className="w-24 h-24 mx-auto object-contain"
                    />
                    <p className="text-sm text-gray-600 mt-2">{t('sprite.normal')}</p>
                  </div>
                )}
                {pokemon.sprites.front_shiny && (
                  <div className="text-center">
                    <img
                      src={pokemon.sprites.front_shiny}
                      alt={`${pokemon.name} shiny`}
                      className="w-24 h-24 mx-auto object-contain"
                    />
                    <p className="text-sm text-gray-600 mt-2">{t('sprite.shiny')}</p>
                  </div>
                )}
                {pokemon.sprites.other?.dream_world?.front_default && (
                  <div className="text-center col-span-2">
                    <img
                      src={pokemon.sprites.other.dream_world.front_default}
                      alt={`${pokemon.name} dream world`}
                      className="w-32 h-32 mx-auto object-contain"
                    />
                    <p className="text-sm text-gray-600 mt-2">{t('sprite.dreamWorld')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};