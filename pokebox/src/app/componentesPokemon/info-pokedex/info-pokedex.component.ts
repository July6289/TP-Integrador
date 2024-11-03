import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-pokedex.component.html',
  styleUrls: ['./info-pokedex.component.css']
})
export class InfoPokedexComponent implements OnInit {
  selectedPokemon: Pokemon | null = null;

  constructor(private pokeService: PokeservicesService) {}

  ngOnInit(): void {
    // Suscribirse al observable para obtener el Pokémon seleccionado
    this.pokeService.selectedPokemon$.subscribe(pokemon => {
      this.selectedPokemon = pokemon; // Actualizar el Pokémon seleccionado
      console.log("Pokemon actualizado en InfoPokedex:", pokemon); // Agregar log para verificar
    });
  }
}
