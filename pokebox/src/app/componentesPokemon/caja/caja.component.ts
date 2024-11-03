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
  pokemonesEnCaja: Pokemon[] = []; // Lista de Pokémon en la caja

  agregarPokemon(pokemon: Pokemon) {
    this.pokemonesEnCaja.push(pokemon);
  }
}
