export interface Generation {
  id: number;
  name: string;
  abilities: Ability[]; // Usaremos Ability para el atributo abilities
  main_region: MainRegion;
  moves: Move[];
  names: Name[];
  pokemon_species: PokemonSpecies[];
  types: Type[];
  version_groups: VersionGroup[];
}

// Interfaces para los atributos de la generación

export interface Ability {
  // Define los atributos de Ability según tus necesidades
  name: string;
  url: string;
}

export interface MainRegion {
  name: string;
  url: string;
}

export interface Move {
  name: string;
  url: string;
}

export interface Name {
  name: string;
  language: Language;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface Type {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}
