import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-pokemon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.css']
})
export class ListaPokemonComponent {
  listaPokemon: Pokemon[] = [];
  pokemonSeleccionado: number | null = null;  // Índice del Pokémon seleccionado
  @Output() pokemonAgregado = new EventEmitter<Pokemon>(); // Evento para enviar el Pokémon a la caja

  pokeService = inject(PokeservicesService);

  seleccionarPokemon(indice: number) {
    this.pokemonSeleccionado = indice;
  }

  agregarPokemonACaja() {
    if (this.pokemonSeleccionado !== null) {
      const pokemon = this.listaPokemon[this.pokemonSeleccionado];
      this.pokemonAgregado.emit(pokemon);  // Emite el Pokémon seleccionado
      this.listaPokemon.splice(this.pokemonSeleccionado, 1);  // Remueve el Pokémon de la lista
      this.pokemonSeleccionado = null;  // Limpia la selección
    }
  }

  buscarPokemonPorGeneracion(dato: any) {
    if (dato.target.value !== '') {
      this.pokeService.getPokemonByGeneration(dato.target.value).subscribe(
        {
          next: (respuesta) => {
            if (respuesta != undefined) {
              this.listaPokemon = [];  // Limpia la lista antes de cargar nuevos Pokémon
              respuesta.pokemon_species.map((pokemonEspecie) => {
                this.pokeService.getPokemonByName(pokemonEspecie.name).subscribe(
                  {
                    next: (poke: Pokemon | undefined) => {
                      if (poke != undefined) {
                        this.listaPokemon.push(poke);
                      }
                    }
                  }
                )
              })
            }
          }
        }
      )
    } else {
      this.listaPokemon = [];
    }
  }
}
