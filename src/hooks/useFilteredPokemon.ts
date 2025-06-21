import { useState, useEffect, useMemo } from 'react';
import { Pokemon } from '../types/pokemon';
import { FilterOptions } from '../components/AdvancedFilter';

export const useFilteredPokemon = (pokemons: Pokemon[], filters: FilterOptions) => {
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(pokemons);

  const getGenerationRange = (generation: number): [number, number] => {
    const ranges: { [key: number]: [number, number] } = {
      1: [1, 151],           // Kanto
      2: [152, 251],         // Johto
      3: [252, 386],         // Hoenn
      4: [387, 493],         // Sinnoh
      5: [494, 649],         // Unova
      6: [650, 721],         // Kalos
      7: [722, 809],         // Alola
      8: [810, 905],         // Galar
      9: [906, 1025],        // Paldea
      10: [1026, 15000],     // Formas Especiais (Mega, Gigantamax, Regionais, etc.)
    };
    return ranges[generation] || [1, 15000];
  };

  const filtered = useMemo(() => {
    let result = [...pokemons];

    // Filtrar por tipos
    if (filters.types.length > 0) {
      result = result.filter(pokemon =>
        pokemon.types.some(type => filters.types.includes(type.type.name))
      );
    }

    // Filtrar por gerações
    if (filters.generations.length > 0) {
      result = result.filter(pokemon => {
        return filters.generations.some(gen => {
          const [min, max] = getGenerationRange(gen);
          return pokemon.id >= min && pokemon.id <= max;
        });
      });
    }

    // Filtrar por estatísticas
    const hasStatFilters = Object.values(filters.stats).some(stat => stat.min > 0 || stat.max < 255);
    if (hasStatFilters) {
      result = result.filter(pokemon => {
        const stats = pokemon.stats.reduce((acc, stat) => {
          const statName = stat.stat.name === 'special-attack' ? 'attack' :
                          stat.stat.name === 'special-defense' ? 'defense' :
                          stat.stat.name;
          if (['hp', 'attack', 'defense', 'speed'].includes(statName)) {
            acc[statName as keyof typeof filters.stats] = stat.base_stat;
          }
          return acc;
        }, {} as { [key: string]: number });

        return Object.entries(filters.stats).every(([statName, range]) => {
          const pokemonStat = stats[statName as keyof typeof stats] || 0;
          return pokemonStat >= range.min && pokemonStat <= range.max;
        });
      });
    }

    return result;
  }, [pokemons, filters]);

  useEffect(() => {
    setFilteredPokemons(filtered);
  }, [filtered]);

  return filteredPokemons;
};