import { Pokemon } from '../interfazpokemon/Pokemon.inteface';

export interface Caja {
  imagen: string;          // Ruta de la imagen de la caja
  pokemones: Pokemon[];    // Lista de Pokémon en esta caja
}

