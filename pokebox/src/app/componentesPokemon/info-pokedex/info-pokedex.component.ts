import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-pokedex.component.html',
  styleUrls: ['./info-pokedex.component.css']
})
export class InfoPokedexComponent {
  @Input() pokemon?: Pokemon; // Recibe el Pokémon seleccionado

  spriteActual: 'front_default' | 'front_female' | 'front_shiny' = 'front_default';

  // Cambia el sprite actual según el botón presionado
  mostrarMacho() {
    this.spriteActual = 'front_default';
  }

  mostrarHembra() {
    this.spriteActual = 'front_female';
  }

  mostrarShiny() {
    this.spriteActual = 'front_shiny';
  }

  // Obtener la URL del sprite actual
  get spriteUrl(): string | undefined {
    return this.pokemon?.sprites[this.spriteActual] || undefined;
  }

}
