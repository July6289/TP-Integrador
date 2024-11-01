import { Routes } from '@angular/router';
import { PokemonpagesComponent } from './pokemonpages/pokemonpages.component';
import { PerfilComponent } from './componentesPokemon/perfil/perfil.component';
import { EquipoPokemonComponent } from './componentesPokemon/equipo-pokemon/equipo-pokemon.component';
import { PaginaPrincipalComponent } from './componentesPokemon/pagina-principal/pagina-principal.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';

export const routes: Routes = [
{
  path: 'perfil',
  component: PerfilComponent
},
{
  path: 'equipo-pokemon',
  component: EquipoPokemonComponent
},
{
  path:'app-pokemonpages',

  component:PokemonpagesComponent,
},
{
  path:'main-page',
  component: PaginaPrincipalComponent,
},
{
  path:'search-pokemon',
  component:SearchPokemonComponent,
},
{
  path:'**',
  redirectTo: 'search-pokemon'
}
];
