import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { CommonModule } from '@angular/common';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';

@Component({
  selector: 'app-selector-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector-pokemon.component.html',
  styleUrl: './selector-pokemon.component.css'
})
export class SelectorPokemonComponent implements OnInit{
  pokemonesEnEquipo: EquipoPokemon =
    {
      nombre: '',
      equipo: []
    };

  constructor(
    private equipoPokemonService: EquipoPokemonService,
    private router: Router
  ) { }
 

  gotoCombate() {
    this.router.navigate(['/combate']);
  }

  goBack() {
    this.equipoPokemonService.guardarTurno(!this.turns);
    this.router.navigate(['/combate']);
  }

  seleccionar(pokemon: Pokemon) {
    console.log(pokemon.name);
    let index = 0;

    for (let i = 0; i < this.pokemonesEnEquipo.equipo.length; i++) {
      if (this.pokemonesEnEquipo.equipo[i] === pokemon) {
        index = i;
      }
    }

    let aux = this.equipoPokemonService.getPosicionEquipo();
    console.log("hola", aux);


    if (index === aux) {
      alert("Ese pokemon esta en combate!");
    }
    else {
      this.equipoPokemonService.setPosicionEquipo(index);
      this.router.navigate(['/combate']);
    }
  }
  
  turns: boolean = true;

  ngOnInit(): void {
    this.pokemonesEnEquipo = this.equipoPokemonService.recibirEquipoPokemon();
    this.turns= this.equipoPokemonService.getTurno();

  }

  gotoMainMenu() {
    this.router.navigate(['/**']);
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
      // Agrega más casos según los tipos de Pokémon que tengas
      default:
        return 'type-default';
    }
  }
}
