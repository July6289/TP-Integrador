import { Component, EventEmitter, Output } from '@angular/core';
import { ListaPokemonComponent } from "../lista-pokemon/lista-pokemon.component";
import { CommonModule } from '@angular/common';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipo-pokemon',
  standalone: true,
  imports: [ListaPokemonComponent, CommonModule],
  templateUrl: './equipo-pokemon.component.html',
  styleUrls: ['./equipo-pokemon.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class EquipoPokemonComponent {

  @Output() pokemonSeleccionado = new EventEmitter<Pokemon>(); // Emisor para el Pokémon seleccionado
  @Output() equipoSeleccionado = new EventEmitter<EquipoPokemon>(); // Emisor para el Pokémon seleccionado
  pokemonesEnEquipo: Pokemon[] = []; // Arreglo para almacenar Pokémon en el equipo
  pokeaux: Pokemon[] = [];
  equipoPokemon: EquipoPokemon =
    {
      nombre: "",
      equipo: []
    }

  constructor(private equipoPokemonService: EquipoPokemonService, private router: Router) {}

  goToMainPage()
  {
    this.router.navigate(['/main-page']);
  }
  

  seleccionarPokemon(pokemon: Pokemon) {
    if (this.pokemonesEnEquipo.length < 6) {
      this.pokeaux = [pokemon];
    } else {
      alert('No puedes agregar más de 6 Pokémon al equipo.'); // Mensaje de alerta
    }
  }

  pickPokemon(pokemon: Pokemon) {
    console.log('Seleccionaste el Pokémon:', pokemon); // Manejo de la selección
    // Aquí puedes añadir la lógica que necesites para manejar el Pokémon seleccionado
  }

  agregarPokemon() {
    if (this.pokemonesEnEquipo.length < 6) {
      if (this.pokeaux[0] != null) {
        this.pokemonesEnEquipo.push(this.pokeaux[0]);
        this.pokeaux = [];

      }
      else {
        alert('No hay ningun pokemon seleccionado!!')
      }

    }
    else {
      alert('No puedes agregar más de 6 Pokémon al equipo.'); // Mensaje de alerta
    }
  }

  eliminarPokemon(pokemon: Pokemon) {
    this.pokemonesEnEquipo = this.pokemonesEnEquipo.filter(p => p !== pokemon);
  }

  guardarEquipo() {
    if (this.pokemonesEnEquipo.length === 6) {
      const nombre = prompt('Ponele un nombre a tu equipo!', 'ejemplo: Equipo dinamita');
      this.equipoPokemon = {
        nombre: String(nombre),
        equipo: this.pokemonesEnEquipo
      };
      this.equipoPokemonService.actualizarEquipo(this.equipoPokemon);
      this.pokemonesEnEquipo = [];
    } else {
      alert('Debe tener 6 pokemon!');
    }
  }
}

