// equiposervices.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EquipoPokemon } from '../interfaces/interfazpokemon/interfazEquipo.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipoPokemonService {
  private equipos: EquipoPokemon[] = [];
  private equiposSubject = new BehaviorSubject<EquipoPokemon[]>(this.equipos);
  equipos$ = this.equiposSubject.asObservable();

  actualizarEquipo(nuevoEquipo: EquipoPokemon) {
    this.equipos.push(nuevoEquipo);
    this.equiposSubject.next([...this.equipos]);  // Emitir copia del arreglo actualizado
  }

  obtenerEquipos() {
    return this.equipos;  // Retorna el arreglo completo
  }

  eliminarEquipo(index: number) {
    this.equipos.splice(index, 1);
    this.equiposSubject.next([...this.equipos]);  // Emitir copia del arreglo actualizado tras eliminación
  }

  actualizarNombreEquipo(index: number, nuevoNombre: string) {
    if (this.equipos[index]) {
      this.equipos[index].nombre = nuevoNombre;
      this.equiposSubject.next([...this.equipos]); // Emitir copia actualizada
    }
  }
  // Método para obtener un equipo por su nombre
  obtenerEquipoPorNombre(nombre: string): EquipoPokemon | undefined {
    return this.equipos.find(equipo => equipo.nombre === nombre);
  }

  poketeam:EquipoPokemon=
  {
    nombre:"",
    equipo: []
  }


  EquipoSeleccionado(equipoSeleccionado : EquipoPokemon)
  {
    this.poketeam=equipoSeleccionado;
  }

  recibirEquipoPokemon():EquipoPokemon
  {
    return this.poketeam;
  }
  selectedPokemon: number=0;

  setPosicionEquipo(id : number)
  {
      this.selectedPokemon=id;
  }

  getPosicionEquipo()
  {
      return this.selectedPokemon;
  }

}
