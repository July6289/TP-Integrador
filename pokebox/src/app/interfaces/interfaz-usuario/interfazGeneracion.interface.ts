import { Caja } from "../interfaz-caja/interfazCaja.inteface";

export interface Usuario {
  id?: string;
  Username: string;
  Password: string | null;
  CombatesGanados: number;
  box: Caja[];
  //combatesGanados: number;
}
