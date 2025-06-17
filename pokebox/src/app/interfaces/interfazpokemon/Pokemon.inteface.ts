export interface Pokemon {
  id: number;
  name: string;
  sprites: Sprites;
  isShiny?: boolean
  isMale?: boolean;
  idEquipo?: number;
  life?: number;
  isAlive?: boolean;
  types: Type[];
}

export interface Type {
  type: string;
}

export interface Sprites {
  front_default: string;
  back_default: string;
  front_female: string;
  back_female: string;
  front_shiny: string;
  back_shiny: string;
  front_shiny_female: string;
  back_shiny_female: string;
}
