import React, { useState } from 'react';
import { X, BarChart3, TrendingUp, Shield, Zap, Heart, Swords, ChevronUp, ChevronDown, Minimize2, Maximize2, Trophy, Crown } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  capitalizeFirstLetter, 
  getPokemonTypeColor, 
  formatPokemonId, 
  translatePokemonType,
  getStatColor
} from '../utils/helpers';

export const ComparisonPanel: React.FC = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const { language, t } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (comparisonList.length === 0) {
    return null;
  }

  const getStatIcon = (statName: string) => {
    switch (statName) {
      case 'hp': return <Heart size={14} className="text-red-500" />;
      case 'attack': return <Swords size={14} className="text-orange-500" />;
      case 'defense': return <Shield size={14} className="text-blue-500" />;
      case 'special-attack': return <Zap size={14} className="text-purple-500" />;
      case 'special-defense': return <Shield size={14} className="text-green-500" />;
      case 'speed': return <TrendingUp size={14} className="text-yellow-500" />;
      default: return <BarChart3 size={14} />;
    }
  };

  const getStatValue = (pokemon: any, statName: string) => {
    return pokemon.stats.find((stat: any) => stat.stat.name === statName)?.base_stat || 0;
  };

  const getMaxStatValue = (statName: string) => {
    return Math.max(...comparisonList.map(pokemon => getStatValue(pokemon, statName)));
  };

  const getTotalStats = (pokemon: any) => {
    return pokemon.stats.reduce((total: number, stat: any) => total + stat.base_stat, 0);
  };

  const getMaxTotalStats = () => {
    return Math.max(...comparisonList.map(pokemon => getTotalStats(pokemon)));
  };

  const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  // Painel minimizado - apenas contador
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 hover:scale-105"
        >
          <BarChart3 size={20} />
          <span className="font-bold">{comparisonList.length}</span>
          <ChevronUp size={16} />
        </button>
      </div>
    );
  }

  // Painel expandido (modal) - Layout otimizado
  if (isExpanded) {
    const maxTotalStats = getMaxTotalStats();
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
          {/* Header compacto */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-white" size={24} />
                <h3 className="text-xl font-bold text-white">
                  {t('comparison.title')} ({comparisonList.length}/4)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearComparison}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                >
                  {t('comparison.clearAll')}
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                >
                  <Minimize2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Content otimizado - sem scroll */}
          <div className="p-4 h-[calc(95vh-80px)] overflow-hidden">
            {/* Layout em grid responsivo */}
            <div className="h-full flex flex-col gap-4">
              
              {/* Pokémon Cards - Horizontal compacto */}
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {comparisonList.map((pokemon) => {
                    const totalStats = getTotalStats(pokemon);
                    const isStrongest = totalStats === maxTotalStats;
                    
                    return (
                      <div
                        key={pokemon.id}
                        className={`relative bg-gradient-to-br rounded-xl p-3 border-2 transition-all duration-200 ${
                          isStrongest 
                            ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg' 
                            : 'border-gray-200 hover:border-blue-300 from-gray-50 to-gray-100'
                        }`}
                      >
                        {isStrongest && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-1.5 rounded-full shadow-md">
                            <Crown size={14} />
                          </div>
                        )}
                        
                        <button
                          onClick={() => removeFromComparison(pokemon.id)}
                          className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-10"
                        >
                          <X size={12} />
                        </button>
                        
                        <div className="text-center">
                          <img
                            src={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="w-16 h-16 mx-auto object-contain mb-2"
                            loading="lazy"
                          />
                          <p className="text-xs text-gray-500 mb-1">
                            {formatPokemonId(pokemon.id)}
                          </p>
                          <h5 className="font-bold text-sm text-gray-800 mb-2 truncate">
                            {capitalizeFirstLetter(pokemon.name)}
                          </h5>
                          <div className="flex justify-center gap-1 flex-wrap mb-2">
                            {pokemon.types.map((type) => (
                              <span
                                key={type.type.name}
                                className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                                style={{ backgroundColor: getPokemonTypeColor(type.type.name) }}
                              >
                                {translatePokemonType(type.type.name, language)}
                              </span>
                            ))}
                          </div>
                          
                          {/* Total Stats */}
                          <div className={`p-2 rounded-lg ${isStrongest ? 'bg-yellow-200 border border-yellow-300' : 'bg-white border border-gray-200'}`}>
                            <p className="text-xs text-gray-600">Total</p>
                            <p className={`text-lg font-bold ${isStrongest ? 'text-yellow-700' : 'text-blue-600'}`}>
                              {totalStats}
                            </p>
                            {isStrongest && (
                              <p className="text-xs text-yellow-600 font-medium">Mais Forte</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats Comparison - Grid compacto */}
              <div className="flex-1 overflow-hidden">
                <h4 className="text-lg font-bold text-gray-800 mb-3">{t('comparison.statsComparison')}</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full overflow-y-auto">
                  {statNames.map((statName) => {
                    const maxValue = getMaxStatValue(statName);
                    return (
                      <div key={statName} className="bg-white rounded-lg p-3 border border-gray-200 h-fit">
                        <div className="flex items-center gap-2 mb-3">
                          {getStatIcon(statName)}
                          <span className="font-bold text-sm text-gray-800">
                            {t(`stats.${statName === 'special-attack' ? 'specialAttack' : statName === 'special-defense' ? 'specialDefense' : statName}`)}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          {comparisonList.map((pokemon) => {
                            const statValue = getStatValue(pokemon, statName);
                            const percentage = maxValue > 0 ? (statValue / maxValue) * 100 : 0;
                            const isHighest = statValue === maxValue && maxValue > 0;
                            
                            return (
                              <div key={`${pokemon.id}-${statName}`} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs font-medium text-gray-700 truncate max-w-20">
                                      {capitalizeFirstLetter(pokemon.name)}
                                    </span>
                                    {isHighest && (
                                      <Trophy size={10} className="text-yellow-500" />
                                    )}
                                  </div>
                                  <span className={`font-bold text-sm ${isHighest ? 'text-green-600' : 'text-gray-700'}`}>
                                    {statValue}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                      isHighest ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-md' : ''
                                    }`}
                                    style={{
                                      width: `${percentage}%`,
                                      backgroundColor: isHighest ? undefined : getStatColor(statValue)
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Painel compacto na parte inferior - Melhorado
  const maxTotalStats = getMaxTotalStats();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-40">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-blue-600" size={18} />
            <h3 className="font-bold text-gray-800 text-sm">
              {t('comparison.title')} ({comparisonList.length}/4)
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              <Maximize2 size={14} />
              Analisar
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              title="Minimizar"
            >
              <ChevronDown size={18} />
            </button>
            <button
              onClick={clearComparison}
              className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
              title="Limpar tudo"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Pokémon Preview Ultra-Compacto */}
        <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
          {comparisonList.map((pokemon, index) => {
            const totalStats = getTotalStats(pokemon);
            const isStrongest = totalStats === maxTotalStats;
            
            return (
              <div
                key={pokemon.id}
                className={`flex-shrink-0 flex items-center gap-2 rounded-lg p-2 border transition-all duration-200 ${
                  isStrongest 
                    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 shadow-md' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {isStrongest && <Crown size={12} className="text-yellow-600" />}
                <img
                  src={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
                <div className="text-left">
                  <p className="text-xs text-gray-500">{formatPokemonId(pokemon.id)}</p>
                  <p className="text-xs font-medium text-gray-800 truncate max-w-16">
                    {capitalizeFirstLetter(pokemon.name)}
                  </p>
                  <p className={`text-xs font-bold ${isStrongest ? 'text-yellow-700' : 'text-blue-600'}`}>
                    {totalStats}
                  </p>
                </div>
                <button
                  onClick={() => removeFromComparison(pokemon.id)}
                  className="p-1 text-red-400 hover:text-red-600 transition-colors"
                >
                  <X size={10} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};