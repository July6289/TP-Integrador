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
  spriteActual: string | null = null;

  constructor(private pokeService: PokeservicesService) { }

  ngOnInit(): void {
    // Suscribirse al observable para obtener el Pokémon seleccionado
    this.pokeService.selectedPokemon$.subscribe(pokemon => {
      this.selectedPokemon = pokemon; // Actualizar el Pokémon seleccionado
    });

    // Suscribirse al sprite actual
    this.pokeService.spriteActual$.subscribe(sprite => {
      this.spriteActual = sprite;
    })
  }

  cambiarAMacho() {
    if (this.selectedPokemon) {
      const spriteUrl = this.selectedPokemon.sprites.front_default;
      if (spriteUrl) {
        this.pokeService.setSpriteActual(spriteUrl);
      }
    }
  }

  cambiarAHembra() {
    if (this.selectedPokemon) {
      const spriteUrl = this.selectedPokemon.sprites.front_female || this.selectedPokemon.sprites.front_default;
      this.pokeService.setSpriteActual(spriteUrl);
    }
  }

  cambiarAShiny() {
    if (this.selectedPokemon) {
      const spriteUrl = this.selectedPokemon.sprites.front_shiny;
      if (spriteUrl) {
        this.pokeService.setSpriteActual(spriteUrl);
      }
    }
  }
}
