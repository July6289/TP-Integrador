import { Component } from '@angular/core';
import { SearchPokemonComponent } from '../search-pokemon/search-pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { PokeservicesService } from '../pokeservices/pokeservices.service';

@Component({
  selector: 'app-pokemonpages',
  standalone: true,
  imports: [SearchPokemonComponent,HttpClientModule],
  templateUrl: './pokemonpages.component.html',
  styleUrl: './pokemonpages.component.css'
})
export class PokemonpagesComponent {

}
