// equiposervices.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EquipoPokemon } from '../interfaces/interfazpokemon/interfazEquipo.interface';
import { PokeservicesService } from './pokeservices.service';
import { Pokemon } from '../interfaces/interfazpokemon/interfazpokemon.inteface';

@Injectable({
  providedIn: 'root'
})
export class EquipoPokemonService {
  private equipos: EquipoPokemon[] = [];
  private equiposSubject = new BehaviorSubject<EquipoPokemon[]>(this.equipos);
  equipos$ = this.equiposSubject.asObservable();

  poketeam: EquipoPokemon =
    {
      nombre: "",
      equipo: []
    }

  pokeRival: EquipoPokemon =
    {
      nombre: "",
      equipo: []
    }

  pokemonTeam: Pokemon[] = [];

  selectedPokemon: number = 0;

  constructor(private pokeService: PokeservicesService) { }

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

  eliminarpokemonPerdedor(index: number, pokeEquipo: EquipoPokemon): EquipoPokemon {
    pokeEquipo.equipo.splice(index, 1);
    return pokeEquipo;
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

  EquipoSeleccionado(equipoSeleccionado: EquipoPokemon) {
    this.poketeam = equipoSeleccionado;
  }

  EquipoSeleccionadoBot(equipoSeleccionado: EquipoPokemon) {
    this.pokeRival = equipoSeleccionado;
  }

  recibirEquipoPokemon(): EquipoPokemon {
    return this.poketeam;
  }

  recibirEquipoPokemonRival(): EquipoPokemon {
    if (this.pokeRival.nombre === "") {
      this.pokeService.getRandomPokemonTeam().subscribe({
        next: (team) => {
          this.pokemonTeam = team;

          for (let i = 0; i < this.pokemonTeam.length; i++) {
            this.pokemonTeam[i].isAlive = true;
          }

          this.pokeRival = {
            nombre: "Rival",
            equipo: this.pokemonTeam
          }
        }
      })
      console.log("sexto rival");
      return this.pokeRival;
    }
    else {
      console.log("septimo rival");
      console.log(this.pokeRival);
      return this.pokeRival;
    }
  }

  setPosicionEquipo(id: number) {
    this.selectedPokemon = id;
  }

  getPosicionEquipo() {
    return this.selectedPokemon;
  }
}
