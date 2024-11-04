import { Routes } from '@angular/router';
import { PerfilComponent } from './componentesPokemon/perfil/perfil.component';
import { EquipoPokemonComponent } from './componentesPokemon/equipo-pokemon/equipo-pokemon.component';
import { PaginaPrincipalComponent } from './componentesPokemon/pagina-principal/pagina-principal.component';
import { ListaEquipoPokemonComponent } from './componentesPokemon/lista-equipo-pokemon/lista-equipo-pokemon.component';
import { PaginaLogueoComponent } from './componentesPokemon/pagina-logueo/pagina-logueo.component';

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
    path: 'lista-pokemon',
    component: ListaEquipoPokemonComponent
  },
  {
    path: 'main-page',
    component: PaginaPrincipalComponent,
  },
  {
    path: 'loggin-page',
    component: PaginaLogueoComponent,
  },
  {
    path: '**',
    redirectTo: 'main-page'
  }
];
