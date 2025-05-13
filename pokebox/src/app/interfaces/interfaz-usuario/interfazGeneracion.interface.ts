import { Caja } from "../interfaz-caja/interfazCaja.inteface";
import { Pokemon } from "../interfazpokemon/interfazpokemon.inteface";
import { Objeto } from "../objetos/objeto.interface";

export interface Usuario {
  id?: string;
  Email: string;
  Password: string | null;
  CombatesGanados: number;
  box: Caja[];
  ListaFavoritos:Pokemon[];
  ListaObjetos:Objeto[]

  //combatesGanados: number;
}
