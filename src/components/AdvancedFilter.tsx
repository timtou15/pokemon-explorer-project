import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { POKEMON_TYPES } from '../types/pokemon';
import { translatePokemonType, getPokemonTypeColor } from '../utils/helpers';

export interface FilterOptions {
  types: string[];
  generations: number[];
  stats: {
    hp: { min: number; max: number };
    attack: { min: number; max: number };
    defense: { min: number; max: number };
    speed: { min: number; max: number };
  };
}

interface AdvancedFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
  currentFilters: FilterOptions; // Nova prop para receber os filtros atuais
}

const GENERATIONS = [
  { id: 1, name: 'Kanto (I)', range: '1-151' },
  { id: 2, name: 'Johto (II)', range: '152-251' },
  { id: 3, name: 'Hoenn (III)', range: '252-386' },
  { id: 4, name: 'Sinnoh (IV)', range: '387-493' },
  { id: 5, name: 'Unova (V)', range: '494-649' },
  { id: 6, name: 'Kalos (VI)', range: '650-721' },
  { id: 7, name: 'Alola (VII)', range: '722-809' },
  { id: 8, name: 'Galar (VIII)', range: '810-905' },
  { id: 9, name: 'Paldea (IX)', range: '906-1025' },
  { id: 10, name: 'Formas Especiais', range: '1026-10000+' },
];

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  onFilterChange,
  onClearFilters,
  isOpen,
  onToggle,
  currentFilters
}) => {
  const { language, t } = useLanguage();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(currentFilters.types);
  const [selectedGenerations, setSelectedGenerations] = useState<number[]>(currentFilters.generations);
  const [statFilters, setStatFilters] = useState(currentFilters.stats);

  const [activeSection, setActiveSection] = useState<string | null>('types');

  // Sincronizar estado interno com os filtros atuais quando eles mudarem
  useEffect(() => {
    setSelectedTypes(currentFilters.types);
    setSelectedGenerations(currentFilters.generations);
    setStatFilters(currentFilters.stats);
  }, [currentFilters]);

  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    
    setSelectedTypes(newTypes);
    updateFilters(newTypes, selectedGenerations, statFilters);
  };

  const handleGenerationToggle = (genId: number) => {
    const newGenerations = selectedGenerations.includes(genId)
      ? selectedGenerations.filter(g => g !== genId)
      : [...selectedGenerations, genId];
    
    setSelectedGenerations(newGenerations);
    updateFilters(selectedTypes, newGenerations, statFilters);
  };

  const handleStatChange = (stat: string, type: 'min' | 'max', value: number) => {
    const newStatFilters = {
      ...statFilters,
      [stat]: {
        ...statFilters[stat as keyof typeof statFilters],
        [type]: value
      }
    };
    
    setStatFilters(newStatFilters);
    updateFilters(selectedTypes, selectedGenerations, newStatFilters);
  };

  const updateFilters = (types: string[], generations: number[], stats: typeof statFilters) => {
    onFilterChange({
      types,
      generations,
      stats
    });
  };

  const clearAllFilters = () => {
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
    
    setSelectedTypes([]);
    setSelectedGenerations([]);
    setStatFilters(emptyFilters.stats);
    onClearFilters();
  };

  const hasActiveFilters = selectedTypes.length > 0 || selectedGenerations.length > 0 || 
    Object.values(statFilters).some(stat => stat.min > 0 || stat.max < 255);

  // Renderizar apenas o botão quando fechado
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
          hasActiveFilters
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        <Filter size={18} />
        {t('filter.filters')}
        {hasActiveFilters && (
          <span className="bg-white text-blue-500 text-xs px-2 py-1 rounded-full font-bold">
            {selectedTypes.length + selectedGenerations.length + 
             Object.values(statFilters).filter(stat => stat.min > 0 || stat.max < 255).length}
          </span>
        )}
      </button>
    );
  }

  // Renderizar o painel completo quando aberto
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="text-white" size={28} />
              <h3 className="text-2xl font-bold text-white">
                {t('filter.advancedFilters')}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {t('filter.clearAll')}
                </button>
              )}
              <button
                onClick={onToggle}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {/* Types Filter */}
            <div className="space-y-4">
              <button
                onClick={() => setActiveSection(activeSection === 'types' ? null : 'types')}
                className="flex items-center justify-between w-full text-left group"
              >
                <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {t('filter.pokemonTypes')}
                  {selectedTypes.length > 0 && (
                    <span className="ml-3 bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium">
                      {selectedTypes.length} {t('filter.selected')}
                    </span>
                  )}
                </h4>
                <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                  {activeSection === 'types' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </button>
              
              {activeSection === 'types' && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {Object.keys(POKEMON_TYPES).map((type) => (
                      <button
                        key={type}
                        onClick={() => handleTypeToggle(type)}
                        className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 ${
                          selectedTypes.includes(type)
                            ? 'text-white shadow-lg scale-105'
                            : 'text-gray-700 bg-white hover:bg-gray-100 shadow-sm'
                        }`}
                        style={{
                          backgroundColor: selectedTypes.includes(type) 
                            ? getPokemonTypeColor(type) 
                            : undefined
                        }}
                      >
                        {translatePokemonType(type, language)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Generations Filter */}
            <div className="space-y-4">
              <button
                onClick={() => setActiveSection(activeSection === 'generations' ? null : 'generations')}
                className="flex items-center justify-between w-full text-left group"
              >
                <h4 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                  {t('filter.generations')}
                  {selectedGenerations.length > 0 && (
                    <span className="ml-3 bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full font-medium">
                      {selectedGenerations.length} {t('filter.selected')}
                    </span>
                  )}
                </h4>
                <div className="text-gray-400 group-hover:text-green-600 transition-colors">
                  {activeSection === 'generations' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </button>
              
              {activeSection === 'generations' && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {GENERATIONS.map((gen) => (
                      <button
                        key={gen.id}
                        onClick={() => handleGenerationToggle(gen.id)}
                        className={`p-4 rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
                          selectedGenerations.includes(gen.id)
                            ? 'bg-green-500 text-white shadow-lg scale-105'
                            : 'bg-white hover:bg-green-50 text-gray-700 shadow-sm border border-gray-200'
                        }`}
                      >
                        <div className="font-bold text-lg">{gen.name}</div>
                        <div className="text-sm opacity-80">#{gen.range}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stats Filter */}
            <div className="space-y-4">
              <button
                onClick={() => setActiveSection(activeSection === 'stats' ? null : 'stats')}
                className="flex items-center justify-between w-full text-left group"
              >
                <h4 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {t('filter.baseStats')}
                  {Object.values(statFilters).some(stat => stat.min > 0 || stat.max < 255) && (
                    <span className="ml-3 bg-purple-100 text-purple-600 text-sm px-3 py-1 rounded-full font-medium">
                      {Object.values(statFilters).filter(stat => stat.min > 0 || stat.max < 255).length} {t('filter.filters')}
                    </span>
                  )}
                </h4>
                <div className="text-gray-400 group-hover:text-purple-600 transition-colors">
                  {activeSection === 'stats' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </button>
              
              {activeSection === 'stats' && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(statFilters).map(([stat, values]) => (
                      <div key={stat} className="bg-white rounded-lg p-4 shadow-sm">
                        <label className="block text-lg font-semibold text-gray-800 mb-4 capitalize">
                          {t(`stats.${stat}`)}
                        </label>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-medium text-gray-600">
                                {t('filter.minimum')}
                              </label>
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-bold">
                                {values.min}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="255"
                              value={values.min}
                              onChange={(e) => handleStatChange(stat, 'min', parseInt(e.target.value))}
                              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-medium text-gray-600">
                                {t('filter.maximum')}
                              </label>
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-bold">
                                {values.max}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="255"
                              value={values.max}
                              onChange={(e) => handleStatChange(stat, 'max', parseInt(e.target.value))}
                              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};