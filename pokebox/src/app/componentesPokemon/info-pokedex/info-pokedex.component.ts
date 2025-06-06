import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';

@Component({
  selector: 'app-info-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-pokedex.component.html',
  styleUrls: ['./info-pokedex.component.css']
})

export class InfoPokedexComponent implements OnInit {
  selectedPokemon: Pokemon | null = null;
  spriteUrl: string = '';
  @Output() guardarDatos = new EventEmitter<void>();

  onGuardarDatos() {
    this.guardarDatos.emit();
  }

  constructor(private pokeService: PokeservicesService) { }

  ngOnInit(): void {
    // Suscribirse al observable para obtener el Pokémon seleccionado
    this.pokeService.selectedPokemon$.subscribe(pokemon => {
      this.selectedPokemon = pokemon;
      this.updateSprite();
    });

    // Suscribirse a los cambios de género y brillo
    this.pokeService.esMacho$.subscribe(() => this.updateSprite());
    this.pokeService.esShiny$.subscribe(() => this.updateSprite());
  }

  cambiarAMacho(): void {
    this.pokeService.setEsMacho(true);
    this.applyChangesToPokemon();
    this.onGuardarDatos();
  }

  cambiarAHembra(): void {
    this.pokeService.setEsMacho(false); // Llama a la lógica de verificación en el servicio
    this.applyChangesToPokemon();
    this.onGuardarDatos();
  }

  cambiarAShiny(): void {
    // Alternar el estado de shiny
    const nuevoEstadoShiny = !this.pokeService.getEsShiny();
    this.pokeService.setEsShiny(nuevoEstadoShiny);
    this.applyChangesToPokemon();
    this.onGuardarDatos();
  }

  private updateSprite(): void {
    this.spriteUrl = this.pokeService.getSprite(this.selectedPokemon);
  }

  private applyChangesToPokemon(): void {
    if (!this.selectedPokemon) {
      console.error('No hay un Pokémon seleccionado.');
      return;
    }

    this.selectedPokemon.isMale = this.pokeService.getEsMachoActual();
    this.selectedPokemon.isShiny = this.pokeService.getEsShinyActual();
    this.pokeService.updatePokemonInCaja(this.selectedPokemon); // Guardar en usuario + back
    this.updateSprite();
  }
}
