export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  base_experience: number;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  species: {
    url: string;
  };
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
  genera: Array<{
    genus: string;
    language: {
      name: string;
    };
  }>;
  habitat: {
    name: string;
  } | null;
  evolution_chain: {
    url: string;
  };
}

export const POKEMON_TYPES = {
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
};

export const POKEMON_TYPE_TRANSLATIONS = {
  normal: 'Normal',
  fighting: 'Lutador',
  flying: 'Voador',
  poison: 'Venenoso',
  ground: 'Terrestre',
  rock: 'Pedra',
  bug: 'Inseto',
  ghost: 'Fantasma',
  steel: 'Aço',
  fire: 'Fogo',
  water: 'Água',
  grass: 'Planta',
  electric: 'Elétrico',
  psychic: 'Psíquico',
  ice: 'Gelo',
  dragon: 'Dragão',
  dark: 'Sombrio',
  fairy: 'Fada',
};

export const STAT_TRANSLATIONS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Ataque Especial',
  'special-defense': 'Defesa Especial',
  speed: 'Velocidade',
};

export const GENERATIONS = [
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

// Generation names for search validation
export const GENERATION_NAMES = [
  'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea',
  'generation', 'gen', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'
];
