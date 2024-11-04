import { Caja } from "../interfaz-caja/interfazCaja.inteface";

export interface Usuario {
  id: number;
  Name: string;
  box: Caja[]; // Usaremos Ability para el atributo abilities
}
