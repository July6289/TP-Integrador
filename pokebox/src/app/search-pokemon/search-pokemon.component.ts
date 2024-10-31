import { Component, OnInit } from '@angular/core';
import { PokeservicesService } from '../pokeservices/pokeservices.service';
import { Pokemon } from '../interfazpokemon/interfazpokemon.component';
import { PokemonpagesComponent } from '../pokemonpages/pokemonpages.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'search-pokemon',
  standalone: true,
  imports: [PokemonpagesComponent,HttpClientModule],
  templateUrl: './search-pokemon.component.html',
  styleUrl: './search-pokemon.component.css'
})
export class SearchPokemonComponent implements OnInit {

constructor(private servicePokemon: PokeservicesService){
}
pokemon?: Pokemon;



  ngOnInit(): void {
  this.servicePokemon.getPokemon().subscribe(
    {
        next:(poke:Pokemon|undefined)=>{
        console.log(poke)
        this.pokemon=poke;

        },
        error:(err)=>{
          console.log(err);

        }




    }
  )
}
}
