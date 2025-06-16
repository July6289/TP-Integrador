import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';
import { TutorialService } from '../../pokeservices/tutorial.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selector-pokemon',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass],
  templateUrl: './selector-pokemon.component.html',
  styleUrl: './selector-pokemon.component.css'
})

export class SelectorPokemonComponent implements OnInit, OnDestroy {
  pokemonesEnEquipo: EquipoPokemon =
    {
      nombre: '',
      equipo: []
    };
  turns: boolean = true;
  nombreJugadorActual: string = '';
  nombreRivalActual: string = '';
  mostrarTutorial: boolean = false;
  private tutorialSub?: Subscription;

  constructor(private equipoPokemonService: EquipoPokemonService, private router: Router, private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.tutorialSub = this.tutorialService.mostrarTutorial$.subscribe(
      mostrar => this.mostrarTutorial = mostrar
    );
    this.pokemonesEnEquipo = this.equipoPokemonService.recibirEquipoPokemon();
    this.turns = this.equipoPokemonService.getTurno();
    // Cargamos los nombres del servicio
    this.nombreJugadorActual = this.equipoPokemonService.obtenerNombreJugador();
    this.nombreRivalActual = this.equipoPokemonService.obtenerNombreRival();

    if (this.pokemonesEnEquipo.equipo[0].life == undefined) {
      for (let i = 0; i < this.pokemonesEnEquipo.equipo.length; i++) {
        this.pokemonesEnEquipo.equipo[i].life = 16;
      }
    }
  }

  cerrarTutorial() {
    this.tutorialService.ocultarTutorial();
  }

  ngOnDestroy() {
    this.tutorialSub?.unsubscribe();
  }

  get posicionPokemonActual() {
    return this.equipoPokemonService.getPosicionEquipo();
  }

  goBack() {
    this.equipoPokemonService.guardarTurno(!this.turns);
    this.router.navigate(['/combate']);
  }

  seleccionar(pokemon: Pokemon) {
    const index = this.pokemonesEnEquipo.equipo.findIndex(p => p === pokemon);
    const indexActual = this.equipoPokemonService.getPosicionEquipo();

    if (index === indexActual) {
      alert("Ese Pokémon ya está en combate!");
      return;
    }

    if (!pokemon.isAlive) {
      alert("¡Este Pokémon está debilitado! No puede entrar al combate.");
      return;
    }

    this.equipoPokemonService.setPosicionEquipo(index);
    this.router.navigate(['/combate']);
  }


  getTypeClass(type: string): string {
    switch (type) {
      case 'normal':
        return 'type-normal';
      case 'fighting':
        return 'type-fighting';
      case 'flying':
        return 'type-flying';
      case 'poison':
        return 'type-poison';
      case 'ground':
        return 'type-ground';
      case 'rock':
        return 'type-rock';
      case 'bug':
        return 'type-bug';
      case 'ghost':
        return 'type-ghost';
      case 'steel':
        return 'type-steel';
      case 'fire':
        return 'type-fire';
      case 'water':
        return 'type-water';
      case 'grass':
        return 'type-grass';
      case 'electric':
        return 'type-electric';
      case 'psychic':
        return 'type-psychic';
      case 'ice':
        return 'type-ice';
      case 'dragon':
        return 'type-dragon';
      case 'dark':
        return 'type-dark';
      case 'fairy':
        return 'type-fairy';
      default:
        return 'type-default';
    }
  }
}
