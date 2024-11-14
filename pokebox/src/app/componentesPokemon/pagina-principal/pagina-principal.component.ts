import { Component, OnInit } from '@angular/core';
import { ListaEquipoPokemonComponent } from "../lista-equipo-pokemon/lista-equipo-pokemon.component";
import { ListaPokemonComponent } from "../lista-pokemon/lista-pokemon.component";
import { CajaComponent } from "../caja/caja.component";
import { InfoPokedexComponent } from "../info-pokedex/info-pokedex.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';

@Component({
  selector: 'pagina-principal',
  standalone: true,
  imports: [ListaEquipoPokemonComponent, ListaPokemonComponent, CajaComponent, InfoPokedexComponent, CommonModule],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})

export class PaginaPrincipalComponent implements OnInit {
  constructor(private router: Router, private poke: PokeservicesService) { }
  color = 'brown';

  pokemon: Pokemon[] =[]

  ngOnInit(): void {

    this.poke.getPokemonByName("pikachu").subscribe({
      next:(pokemono: Pokemon | undefined)=>{
        console.log(pokemono);
      }
    })

  }

  goToCombate() {
    this.router.navigate(['/selector']);
  }

}
