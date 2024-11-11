import { Caja } from "../interfaz-caja/interfazCaja.inteface";

export interface Usuario {
  Username: string;
  Password:string;
  box: Caja[];
}
