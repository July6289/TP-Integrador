import { Routes } from '@angular/router';
import { PokemonpagesComponent } from './pages/pokemonpages/pokemonpages.component';

export const routes: Routes = [
{
  path:'app-pokemonpages',

  component:PokemonpagesComponent,
},
{
  path:'**',
  redirectTo:'app-pokemonpages',


}

];
