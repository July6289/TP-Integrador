import { Component, EventEmitter, Output } from '@angular/core';
import { ListaPokemonComponent } from "../lista-pokemon/lista-pokemon.component";
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipo-pokemon',
  standalone: true,
  imports: [ListaPokemonComponent, CommonModule],
  templateUrl: './equipo-pokemon.component.html',
  styleUrls: ['./equipo-pokemon.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class EquipoPokemonComponent {
  @Output() pokemonSeleccionado = new EventEmitter<Pokemon>(); // Emisor para el Pokémon seleccionado
  pokemonesEnCaja: Pokemon[] = []; // Arreglo para almacenar Pokémon en el equipo

  agregarPokemon(pokemon: Pokemon) {
    if (this.pokemonesEnCaja.length < 6) { // Verifica si hay menos de 6 Pokémon
      this.pokemonesEnCaja.push(pokemon); // Agrega el Pokémon al equipo
    } else {
      alert('No puedes agregar más de 6 Pokémon al equipo.'); // Mensaje de alerta
    }
  }
  seleccionarPokemon(pokemon: Pokemon) {
    console.log('Seleccionaste el Pokémon:', pokemon); // Manejo de la selección
    // Aquí puedes añadir la lógica que necesites para manejar el Pokémon seleccionado
  }
}
