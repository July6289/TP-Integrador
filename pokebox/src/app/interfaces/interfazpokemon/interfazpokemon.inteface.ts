export interface Pokemon {
  forms: Species[]; //
  id: number;
  is_default: boolean;
  name: string;
  species: Species; //
  sprites: Sprites;
  types: Type[];
  idEquipo?: number;
  isShiny?: boolean
  isMale?: boolean;
  life?: number;
  isAlive?: boolean;
}

export interface Type {
  slot: number;
  type: Species;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}
