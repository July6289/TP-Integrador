import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { CommonModule } from '@angular/common';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';

@Component({
  selector: 'app-selector-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector-pokemon.component.html',
  styleUrl: './selector-pokemon.component.css'
})
export class SelectorPokemonComponent {

  gotoCombate() {
    this.router.navigate(['/combate']);
  }

  seleccionar(pokemon: Pokemon) {
    console.log(pokemon.name);
    let index=0;

    for(let i=0; i<this.pokemonesEnEquipo.equipo.length; i++)
    {
      if(this.pokemonesEnEquipo.equipo[i]===pokemon)
        {
          index=i;
        }

        
    }
    
    

    this.equipoPokemonService.setPosicionEquipo(index);

    this.router.navigate(['/combate']);

  }

  pokemonesEnEquipo: EquipoPokemon =
    {
      nombre: '',
      equipo: []
    };


  constructor(
    private pokeservice: PokeservicesService,
    private route: ActivatedRoute,
    private equipoPokemonService: EquipoPokemonService,
    private router: Router
  ) { }



  ngOnInit(): void {

    this.pokemonesEnEquipo = this.equipoPokemonService.recibirEquipoPokemon();
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
      case 'stelar':
        return 'type-stelar'

      // Agrega más casos según los tipos de Pokémon que tengas
      default:
        return 'type-default';
    }
  }
}
