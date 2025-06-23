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
      
      console.log(`Carregamento otimizado iniciado`);
      
      // Primeiro, buscar a lista completa para obter o total exato
      const initialList = await pokemonService.getPokemonList(0, 1);
      const realTotal = initialList.count;
      setExactTotal(realTotal);
      setProgress({ current: 0, total: realTotal });
      
      console.log(`Total de Pokémon detectado: ${realTotal.toLocaleString()}`);
      
      // Buscar todos os Pokémon com carregamento otimizado
      const pokemonList = await pokemonService.getPokemonList(0, realTotal);
      
      // Extrair IDs dos URLs de forma otimizada
      const pokemonIds = pokemonList.results.map((item: any) => {
        const matches = item.url.match(/\/(\d+)\/$/);
        return matches ? parseInt(matches[1]) : 0;
      }).filter((id: number) => id > 0);

      console.log(`IDs extraídos: ${pokemonIds.length.toLocaleString()}`);

      // Carregamento em lotes otimizados
      const batchSize = 100; // Lotes maiores para melhor throughput
      const allPokemonData: Pokemon[] = [];
      
      // Processar múltiplos lotes simultaneamente
      const concurrentBatches = 3; // Processar 3 lotes ao mesmo tempo
      
      for (let i = 0; i < pokemonIds.length; i += batchSize * concurrentBatches) {
        const batchPromises = [];
        
        // Criar múltiplos lotes simultâneos
        for (let j = 0; j < concurrentBatches && (i + j * batchSize) < pokemonIds.length; j++) {
          const startIndex = i + j * batchSize;
          const batch = pokemonIds.slice(startIndex, startIndex + batchSize);
          
          if (batch.length > 0) {
            batchPromises.push(
              pokemonService.getPokemonBatch(batch).catch(error => {
                console.warn(`Erro no lote ${startIndex}-${startIndex + batch.length}:`, error);
                return [];
              })
            );
          }
        }
        
        try {
          // Processar lotes simultaneamente
          const batchResults = await Promise.all(batchPromises);
          
          // Combinar resultados de todos os lotes
          for (const batchData of batchResults) {
            const validPokemon = batchData.filter(pokemon => pokemon !== null);
            allPokemonData.push(...validPokemon);
          }
          
          // Atualizar progresso
          setProgress({ current: allPokemonData.length, total: realTotal });
          setAllPokemons([...allPokemonData]);
          
          // Log de progresso otimizado
          if (allPokemonData.length % 1000 === 0 || allPokemonData.length > pokemonIds.length - 100) {
            console.log(`Progresso: ${allPokemonData.length.toLocaleString()}/${realTotal.toLocaleString()}`);
          }
          
        } catch (batchError) {
          console.error(`Erro no grupo de lotes ${i}:`, batchError);
        }
        
        // Delay mínimo apenas entre grupos de lotes
        if (i + batchSize * concurrentBatches < pokemonIds.length) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }

      console.log(`Carregamento otimizado concluído!`);
      console.log(`Pokémon carregados: ${allPokemonData.length.toLocaleString()}/${realTotal.toLocaleString()}`);
      
      setAllPokemons(allPokemonData);
      setIsLoaded(true);
      setProgress({ current: allPokemonData.length, total: realTotal });
      
    } catch (err) {
      console.error('Erro no carregamento:', err);
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
