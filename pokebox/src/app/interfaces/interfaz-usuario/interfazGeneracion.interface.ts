import { Caja } from "../interfaz-caja/interfazCaja.inteface";
import { Pokemon } from "../interfazpokemon/interfazpokemon.inteface";

export interface Usuario {
  id?: string;
  Email: string;
  Password: string | null;
  CombatesGanados: number;
  box: Caja[];
  ListaFavoritos:Pokemon[];


  //combatesGanados: number;
}
