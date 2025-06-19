import { useState, useEffect } from 'react';
import { Pokemon, PokemonListResponse, PokemonSpecies } from '../types/pokemon';
import { ServiceContainer } from '../services/PokemonService';
import { extractPokemonId } from '../utils/helpers';

export const usePokemonList = (offset: number, limit: number) => {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(null);
  const [detailedPokemons, setDetailedPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pokemonService = ServiceContainer.getInstance().getPokemonService();

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar lista básica
        const data = await pokemonService.getPokemonList(offset, limit);
        setPokemonList(data);
        
        // Buscar detalhes de cada Pokémon para obter os tipos corretos
        const pokemonIds = data.results.map((item: any) => extractPokemonId(item.url));
        const detailedData = await pokemonService.getPokemonBatch(pokemonIds);
        
        // Filtrar apenas Pokémon válidos (não nulos)
        const validPokemons = detailedData.filter(pokemon => pokemon !== null);
        setDetailedPokemons(validPokemons);
        
      } catch (err) {
        console.error('Erro ao buscar lista de Pokémon:', err);
        setError(err instanceof Error ? err.message : 'Falha ao buscar lista de Pokémon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [offset, limit]);

  return { pokemonList, detailedPokemons, loading, error };
};

export const usePokemon = (nameOrId: string | number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pokemonService = ServiceContainer.getInstance().getPokemonService();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const pokemonData = await pokemonService.getPokemon(nameOrId);
        setPokemon(pokemonData);
        
        // Buscar dados da espécie (pode falhar para alguns Pokémon)
        try {
          const speciesData = await pokemonService.getPokemonSpecies(pokemonData.id);
          setSpecies(speciesData);
        } catch (speciesError) {
          console.warn(`Não foi possível carregar dados da espécie para ${nameOrId}:`, speciesError);
          // Definir dados vazios para espécie se não conseguir carregar
          setSpecies({
            flavor_text_entries: [],
            genera: [],
            habitat: null,
            evolution_chain: { url: '' }
          });
        }
        
      } catch (err) {
        console.error(`Erro ao buscar Pokémon ${nameOrId}:`, err);
        setError(err instanceof Error ? err.message : 'Falha ao buscar Pokémon');
      } finally {
        setLoading(false);
      }
    };

    if (nameOrId) {
      fetchPokemon();
    }
  }, [nameOrId]);

  return { pokemon, species, loading, error };
};