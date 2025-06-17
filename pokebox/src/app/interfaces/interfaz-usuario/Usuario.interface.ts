import { Caja } from "../interfaz-caja/Caja.inteface";
import { EquipoPokemon } from "../interfazpokemon/Equipo.interface";
import { Pokemon } from "../interfazpokemon/Pokemon.inteface";
import { Objeto } from "../objetos/objeto.interface";

export interface Usuario {
  id?: string;
  Email: string;
  Username:string;
  Password: string | null;
  UrlImagenPerfil:string;
  CombatesGanados: number;
  box: Caja[];
  ListaFavoritos: Pokemon[];
  ListaEquipos: EquipoPokemon[];
  ListaObjetos: Objeto[];
}
