export interface IPokemonService {
  getPokemonList(offset: number, limit: number): Promise<any>;
  getPokemon(nameOrId: string | number): Promise<any>;
  getPokemonSpecies(id: number): Promise<any>;
  searchPokemon(query: string): Promise<any>;
  getPokemonBatch(ids: number[]): Promise<any[]>;
  getAbilityDescription(abilityName: string, language: string): Promise<string>;
}

export class PokemonService implements IPokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private abilityCache = new Map<string, any>();
  private speciesCache = new Map<number, any>();
  private pokemonCache = new Map<string | number, any>();
  private requestQueue: Promise<any>[] = [];
  private maxConcurrentRequests = 20; // Aumentado para melhor performance

  private async throttleRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    // Controle de concorrência otimizado
    while (this.requestQueue.length >= this.maxConcurrentRequests) {
      await Promise.race(this.requestQueue);
    }

    const promise = requestFn().finally(() => {
      const index = this.requestQueue.indexOf(promise);
      if (index > -1) {
        this.requestQueue.splice(index, 1);
      }
    });

    this.requestQueue.push(promise);
    return promise;
  }

  async getPokemonList(offset: number = 0, limit: number = 20) {
    const cacheKey = `list-${offset}-${limit}`;
    if (this.pokemonCache.has(cacheKey)) {
      return this.pokemonCache.get(cacheKey);
    }

    return this.throttleRequest(async () => {
      const response = await fetch(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar lista de Pokémon');
      }
      
      const data = await response.json();
      this.pokemonCache.set(cacheKey, data);
      return data;
    });
  }

  async getPokemon(nameOrId: string | number) {
    if (this.pokemonCache.has(nameOrId)) {
      return this.pokemonCache.get(nameOrId);
    }

    return this.throttleRequest(async () => {
      try {
        const response = await fetch(`${this.baseUrl}/pokemon/${nameOrId}`);
        if (!response.ok) {
          throw new Error(`Falha ao buscar Pokémon: ${nameOrId}`);
        }
        
        const data = await response.json();
        this.pokemonCache.set(nameOrId, data);
        this.pokemonCache.set(data.id, data);
        return data;
      } catch (error) {
        console.error(`Erro ao buscar Pokémon ${nameOrId}:`, error);
        throw error;
      }
    });
  }

  async getPokemonSpecies(id: number) {
    if (this.speciesCache.has(id)) {
      return this.speciesCache.get(id);
    }

    return this.throttleRequest(async () => {
      try {
        const response = await fetch(`${this.baseUrl}/pokemon-species/${id}`);
        if (!response.ok) {
          const emptySpecies = {
            flavor_text_entries: [],
            genera: [],
            habitat: null,
            evolution_chain: { url: '' }
          };
          this.speciesCache.set(id, emptySpecies);
          return emptySpecies;
        }
        
        const data = await response.json();
        this.speciesCache.set(id, data);
        return data;
      } catch (error) {
        const emptySpecies = {
          flavor_text_entries: [],
          genera: [],
          habitat: null,
          evolution_chain: { url: '' }
        };
        this.speciesCache.set(id, emptySpecies);
        return emptySpecies;
      }
    });
  }

  async searchPokemon(query: string) {
    try {
      return await this.getPokemon(query.toLowerCase());
    } catch (error) {
      throw new Error(`Pokémon "${query}" não encontrado`);
    }
  }

  async getPokemonBatch(ids: number[]) {
    // Ultra-otimizado: processar todos simultaneamente com throttling inteligente
    const promises = ids.map(async (id) => {
      try {
        return await this.getPokemon(id);
      } catch (error) {
        console.warn(`Erro ao buscar Pokémon ID ${id}:`, error);
        return null;
      }
    });
    
    // Aguardar todos os resultados
    const results = await Promise.all(promises);
    return results.filter(pokemon => pokemon !== null);
  }

  async getAbilityDescription(abilityName: string, language: string = 'en'): Promise<string> {
    const cacheKey = `${abilityName}-${language}`;
    
    if (this.abilityCache.has(cacheKey)) {
      return this.abilityCache.get(cacheKey);
    }

    return this.throttleRequest(async () => {
      try {
        const response = await fetch(`${this.baseUrl}/ability/${abilityName}`);
        if (!response.ok) {
          this.abilityCache.set(cacheKey, '');
          return '';
        }
        
        const abilityData = await response.json();
        let description = '';
        
        if (language === 'pt') {
          const manualTranslations: {[key: string]: string} = {
            // Habilidades básicas
            'overgrow': 'Fortalece movimentos do tipo Planta quando o HP está baixo.',
            'chlorophyll': 'Dobra a Velocidade durante sol forte.',
            'torrent': 'Fortalece movimentos do tipo Água quando o HP está baixo.',
            'rain-dish': 'Recupera HP gradualmente durante a chuva.',
            'blaze': 'Fortalece movimentos do tipo Fogo quando o HP está baixo.',
            'solar-power': 'Aumenta o Ataque Especial durante sol forte, mas perde HP.',
            'swarm': 'Fortalece movimentos do tipo Inseto quando o HP está baixo.',
            'keen-eye': 'Impede que a Precisão seja reduzida.',
            'tangled-feet': 'Aumenta a Evasão quando confuso.',
            'big-pecks': 'Protege contra reduções de Defesa.',
            'intimidate': 'Reduz o Ataque do oponente ao entrar em batalha.',
            'static': 'Pode paralisar o atacante ao fazer contato.',
            'lightning-rod': 'Atrai movimentos elétricos e aumenta o Ataque Especial.',
            'sand-veil': 'Aumenta a Evasão durante tempestades de areia.',
            'poison-point': 'Pode envenenar o atacante ao fazer contato.',
            'rivalry': 'Causa mais dano contra Pokémon do mesmo gênero.',
            'sheer-force': 'Remove efeitos adicionais dos movimentos para aumentar o poder.',
            'hustle': 'Aumenta o Ataque, mas reduz a Precisão.',
            'serene-grace': 'Dobra a chance de efeitos adicionais dos movimentos.',
            'natural-cure': 'Cura problemas de status ao sair de batalha.',
            'synchronize': 'Passa envenenamento, paralisia ou queimadura para o atacante.',
            'clear-body': 'Impede que as estatísticas sejam reduzidas por outros.',
            'liquid-ooze': 'Causa dano a quem tenta drenar HP.',
            'rock-head': 'Protege contra dano de recuo.',
            'sturdy': 'Não pode ser nocauteado de uma vez quando com HP cheio.',
            'damp': 'Impede o uso de movimentos explosivos.',
            'limber': 'Protege contra paralisia.',
            'cloud-nine': 'Elimina os efeitos do clima.',
            'compound-eyes': 'Aumenta a Precisão dos movimentos.',
            'shield-dust': 'Bloqueia efeitos adicionais de movimentos de ataque.',
            'run-away': 'Garante fuga de Pokémon selvagens.',
            'early-bird': 'Acorda do sono mais rapidamente.',
            'flash-fire': 'Fortalece movimentos de Fogo após ser atingido por um.',
            'inner-focus': 'Protege contra hesitação.',
            'magma-armor': 'Protege contra congelamento.',
            'water-absorb': 'Recupera HP quando atingido por movimentos de Água.',
            'oblivious': 'Protege contra atração e provocação.',
            'own-tempo': 'Protege contra confusão.',
            'suction-cups': 'Impede troca forçada.',
            'guts': 'Aumenta o Ataque quando afetado por problemas de status.',
            'marvel-scale': 'Aumenta a Defesa quando afetado por problemas de status.',
            'wonder-guard': 'Só recebe dano de movimentos super eficazes.',
            'levitate': 'Flutua no ar, evitando movimentos do tipo Terra.',
            'effect-spore': 'Pode causar sono, paralisia ou envenenamento ao atacante.',
            'arena-trap': 'Impede que oponentes terrestres fujam.',
            'vital-spirit': 'Protege contra sono.',
            'white-smoke': 'Protege contra redução de estatísticas.',
            'pure-power': 'Dobra o poder de Ataque físico.',
            'shell-armor': 'Protege contra golpes críticos.',
            'air-lock': 'Elimina os efeitos do clima.',
            'hyper-cutter': 'Protege contra redução de Ataque.',
            'pickup': 'Pode encontrar itens após a batalha.',
            'truant': 'Só pode usar movimentos em turnos alternados.',
            'shadow-tag': 'Impede que o oponente fuja.',
            'rough-skin': 'Causa dano ao atacante por contato.',
            'insomnia': 'Protege contra sono.',
            'color-change': 'Muda o tipo para o do último movimento recebido.',
            'immunity': 'Protege contra envenenamento.',
            'flame-body': 'Pode queimar o atacante por contato.',
            'magnet-pull': 'Impede que Pokémon do tipo Aço fujam.',
            'soundproof': 'Protege contra movimentos baseados em som.',
            'sand-stream': 'Invoca tempestade de areia ao entrar em batalha.',
            'pressure': 'Faz o oponente gastar mais PP.',
            'thick-fat': 'Reduz dano de movimentos de Fogo e Gelo.',
            'drought': 'Invoca sol forte ao entrar em batalha.',
            'drizzle': 'Invoca chuva ao entrar em batalha.',
            'speed-boost': 'Aumenta a Velocidade a cada turno.',
            'battle-armor': 'Protege contra golpes críticos.',
            'sand-force': 'Fortalece certos movimentos durante tempestade de areia.',
            'iron-fist': 'Fortalece movimentos de soco.',
            'poison-heal': 'Recupera HP quando envenenado.',
            'adaptability': 'Aumenta o bônus STAB.',
            'skill-link': 'Movimentos multi-hit sempre acertam o máximo.',
            'hydration': 'Cura problemas de status na chuva.',
            'quick-feet': 'Aumenta Velocidade quando com problema de status.',
            'normalize': 'Todos os movimentos se tornam do tipo Normal.',
            'sniper': 'Aumenta o poder de golpes críticos.',
            'magic-guard': 'Só recebe dano de ataques diretos.',
            'no-guard': 'Todos os movimentos sempre acertam.',
            'stall': 'Sempre age por último.',
            'technician': 'Fortalece movimentos fracos.',
            'leaf-guard': 'Protege contra problemas de status no sol.',
            'klutz': 'Não pode usar o item equipado.',
            'mold-breaker': 'Ignora habilidades que bloqueiam movimentos.',
            'super-luck': 'Aumenta a taxa de golpes críticos.',
            'aftermath': 'Causa dano ao atacante se nocauteado por contato.',
            'anticipation': 'Detecta movimentos perigosos do oponente.',
            'forewarn': 'Revela um dos movimentos do oponente.',
            'unaware': 'Ignora mudanças de estatísticas do oponente.',
            'tinted-lens': 'Fortalece movimentos "não muito eficazes".',
            'filter': 'Reduz dano de movimentos super eficazes.',
            'slow-start': 'Reduz Ataque e Velocidade por 5 turnos.',
            'scrappy': 'Permite atingir Pokémon do tipo Fantasma com movimentos Normais e Lutador.',
          };

          if (manualTranslations[abilityName]) {
            description = manualTranslations[abilityName];
          } else {
            let ptEntry = abilityData.effect_entries?.find(
              (entry: any) => entry.language.name === 'pt'
            );
            
            if (ptEntry) {
              description = ptEntry.short_effect || ptEntry.effect || '';
            }
            
            if (!description && abilityData.flavor_text_entries) {
              const ptFlavorEntry = abilityData.flavor_text_entries.find(
                (entry: any) => entry.language.name === 'pt'
              );
              if (ptFlavorEntry) {
                description = ptFlavorEntry.flavor_text || '';
              }
            }
            
            if (!description) {
              const enEntry = abilityData.effect_entries?.find(
                (entry: any) => entry.language.name === 'en'
              );
              if (enEntry) {
                description = enEntry.short_effect || enEntry.effect || '';
              }
            }
          }
        } else {
          const enEntry = abilityData.effect_entries?.find(
            (entry: any) => entry.language.name === 'en'
          );
          if (enEntry) {
            description = enEntry.short_effect || enEntry.effect || '';
          }
        }
        
        description = description
          .replace(/\n/g, ' ')
          .replace(/\r/g, ' ')
          .replace(/\f/g, ' ')
          .trim();
        
        this.abilityCache.set(cacheKey, description);
        return description;
      } catch (error) {
        console.error(`Erro ao buscar descrição da habilidade ${abilityName}:`, error);
        this.abilityCache.set(cacheKey, '');
        return '';
      }
    });
  }
}

export class ServiceContainer {
  private static instance: ServiceContainer;
  private pokemonService: IPokemonService;

  private constructor() {
    this.pokemonService = new PokemonService();
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  getPokemonService(): IPokemonService {
    return this.pokemonService;
  }
}
