import { Component, inject, OnInit } from '@angular/core';
import { PokeservicesService } from '../pokeservices/pokeservices.service';
import { Pokemon } from '../interfazpokemon/interfazpokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonpagesComponent } from '../pokemonpages/pokemonpages.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search-pokemon',
  standalone: true,
  imports: [PokemonpagesComponent, HttpClientModule,FormsModule],
  templateUrl: './search-pokemon.component.html',
  styleUrl: './search-pokemon.component.css'
})
export class SearchPokemonComponent implements OnInit {
  pokemon?: Pokemon;
  nombrePokemon:string='';
  ngOnInit():void{
  }

  pokeservice=inject(PokeservicesService)



  obtenerpokemon()
  {
    this.pokeservice.getPokemon(this.nombrePokemon).subscribe(
    {
      next: (poke: Pokemon | undefined) => {
        console.log(poke)
        this.pokemon = poke;

      },
      error: (err) => {
        console.log(err);

      }


    }


    )




  }


}
