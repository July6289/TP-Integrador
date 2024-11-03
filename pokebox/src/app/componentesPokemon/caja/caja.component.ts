import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent {
  private readonly MAX_POKEMON = 30; // Límite máximo de Pokémon en la caja
  pokemonesEnCaja: Pokemon[] = []; // Lista de Pokémon en la caja

  agregarPokemon(pokemon: Pokemon) {
    if (this.pokemonesEnCaja.length < this.MAX_POKEMON) {
      this.pokemonesEnCaja.push(pokemon);
    } else {
      console.warn('No se pueden agregar más Pokémon a la caja. Límite alcanzado.');
    }
  }
}
