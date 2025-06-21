import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';
import { ServiceContainer } from '../services/PokemonService';

export const useAllPokemon = () => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [exactTotal, setExactTotal] = useState(0);

  const pokemonService = ServiceContainer.getInstance().getPokemonService();

  const loadAllPokemons = async () => {
    if (isLoaded || loading) return;

    try {
      setLoading(true);
      setError(null);
      
      console.log(`Carregando todos os Pokémon para filtros completos`);
      
      // Primeiro, buscar a lista completa para obter o total exato
      const initialList = await pokemonService.getPokemonList(0, 1);
      const realTotal = initialList.count;
      setExactTotal(realTotal);
      setProgress({ current: 0, total: realTotal });
      
      // Buscar todos os Pokémon principais (limitando a 1500 para performance)
      const totalToLoad = Math.min(realTotal, 1500);
      const pokemonList = await pokemonService.getPokemonList(0, totalToLoad);
      
      // Extrair IDs dos URLs
      const pokemonIds = pokemonList.results.map((item: any) => {
        const matches = item.url.match(/\/(\d+)\/$/);
        return matches ? parseInt(matches[1]) : 0;
      }).filter(id => id > 0);

      console.log(`IDs extraídos: ${pokemonIds.length.toLocaleString()}`);

      // Buscar detalhes em lotes otimizados
      const batchSize = 100;
      const allPokemonData: Pokemon[] = [];
      
      for (let i = 0; i < pokemonIds.length; i += batchSize) {
        const batch = pokemonIds.slice(i, i + batchSize);
        
        try {
          const batchData = await pokemonService.getPokemonBatch(batch);
          const validPokemon = batchData.filter(pokemon => pokemon !== null);
          allPokemonData.push(...validPokemon);
          
          setProgress({ current: allPokemonData.length, total: realTotal });
          setAllPokemons([...allPokemonData]);
          
          // Log de progresso a cada 500 Pokémon
          if (allPokemonData.length % 500 === 0) {
            console.log(`Progresso: ${allPokemonData.length.toLocaleString()}/${realTotal.toLocaleString()}`);
          }
          
        } catch (batchError) {
          console.error(`Erro no lote ${i}-${i + batchSize}:`, batchError);
        }
        
        // Delay mínimo para não sobrecarregar a API
        if (i + batchSize < pokemonIds.length) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }

      console.log(`Carregamento completo concluído`);
      console.log(`Pokémon carregados: ${allPokemonData.length.toLocaleString()}`);
      
      setAllPokemons(allPokemonData);
      setIsLoaded(true);
      setProgress({ current: allPokemonData.length, total: realTotal });
      
    } catch (err) {
      console.error('Erro ao carregar Pokémon:', err);
      setError(err instanceof Error ? err.message : 'Falha ao carregar Pokémon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded && !loading) {
      loadAllPokemons();
    }
  }, []);

  return { 
    allPokemons, 
    loading, 
    error, 
    isLoaded, 
    loadAllPokemons, 
    progress,
    exactTotal
  };
};