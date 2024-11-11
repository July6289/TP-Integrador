import { Routes } from '@angular/router';
import { PerfilComponent } from './componentesPokemon/perfil/perfil.component';
import { EquipoPokemonComponent } from './componentesPokemon/equipo-pokemon/equipo-pokemon.component';
import { PaginaPrincipalComponent } from './componentesPokemon/pagina-principal/pagina-principal.component';
import { ListaEquipoPokemonComponent } from './componentesPokemon/lista-equipo-pokemon/lista-equipo-pokemon.component';
import { PestaniaCombateComponent } from './componentesPokemon/pestania-combate/pestania-combate.component';
import { VisualizarEquipoComponent } from './componentesPokemon/visualizar-equipo/visualizar-equipo.component';
import { PaginaLogueoComponent } from './menu-principal/pagina-logueo/pagina-logueo.component';

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
    path: 'selector',
    component: ListaEquipoPokemonComponent
  },
  {
    path: 'main-page',
    component: PaginaPrincipalComponent,
  },
  {
    path: 'menu-page',
    component: PaginaLogueoComponent,

  },
  {
    path:'combate',
    component: PestaniaCombateComponent,
  },
  {
    path: 'equipo/:nombre',
    component: VisualizarEquipoComponent,
  },
  {
    path: '**',
    redirectTo: 'menu-page'
  }
];
