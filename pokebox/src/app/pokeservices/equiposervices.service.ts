import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EquipoPokemon } from '../interfazpokemon/interfazEquipo.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipoPokemonService {
  private equipoPokemonSubject = new BehaviorSubject<EquipoPokemon | null>(null);
  equipoPokemon$ = this.equipoPokemonSubject.asObservable();

  actualizarEquipo(equipo: EquipoPokemon) {
    this.equipoPokemonSubject.next(equipo);
  }

  obtenerEquipo() {
    return this.equipoPokemonSubject.getValue();
  }
}
