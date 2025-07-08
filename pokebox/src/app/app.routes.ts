import { Routes } from '@angular/router';
import { PerfilComponent } from './componentesPokemon/perfil/perfil.component';
import { EquipoPokemonComponent } from './componentesPokemon/equipo-pokemon/equipo-pokemon.component';
import { PaginaPrincipalComponent } from './componentesPokemon/pagina-principal/pagina-principal.component';
import { ListaEquipoPokemonComponent } from './componentesPokemon/lista-equipo-pokemon/lista-equipo-pokemon.component';
import { PestaniaCombateComponent } from './componentesPokemon/pestania-combate/pestania-combate.component';
import { VisualizarEquipoComponent } from './componentesPokemon/visualizar-equipo/visualizar-equipo.component';
import { PaginaLogueoComponent } from './componentesPokemon/menu-principal/pagina-logueo/pagina-logueo.component';
import { SelectorPokemonComponent } from './componentesPokemon/selector-pokemon/selector-pokemon.component';
import { AccessDeniedPageComponent } from './auth/access-denied-page/access-denied-page.component';
import { authGuardFnLogout } from './auth/guard/auth.guard-fn-logout';
import { authGuardFn } from './auth/guard/auth.guard-fn';
import { RecuperarContraComponent } from './componentesPokemon/recuperar-contra/recuperar-contra.component';
import { ListaObjetosComponent } from './componentesPokemon/lista-objetos/lista-objetos.component';
import { authGuardFnCombat } from './auth/guard/auth.guard-fn-Combat';
import { RedirigirComponent } from './redirigir/redirigir.component';
import { UsuarioVerificadoComponent } from './usuario-verificado/usuario-verificado.component';

export const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate:[authGuardFn]
  },
  {
    path: 'lista-objetos',
    component: ListaObjetosComponent,
    canActivate:[authGuardFn]
  },
  {
    path: 'equipo-pokemon',
    component: EquipoPokemonComponent,
    canActivate:[authGuardFn]
  },
  {
    path: 'selector',
    component: ListaEquipoPokemonComponent,
    canActivate:[authGuardFn]
  },
  {
    path: 'main-page',
    component: PaginaPrincipalComponent,
    canActivate:[authGuardFn]
  },
  {
    path: 'registro',
    component: PaginaLogueoComponent,

  },
  {
    path:'access-denied',
    component:AccessDeniedPageComponent,
    canActivate:[authGuardFnLogout]
  },
  {
    path: 'combate',
    component: PestaniaCombateComponent,
    canActivate:[authGuardFn,authGuardFnCombat],
  },
  {
    path: 'equipo/:nombre',
    component: VisualizarEquipoComponent,
    canActivate:[authGuardFn]
  },
  {
    path: 'cambiar-pokemon',
    component: SelectorPokemonComponent,
    canActivate:[authGuardFn]
  },
  {
    path:'cambiar-contra',
    component:RecuperarContraComponent,
  },
  {
    path:'redireccion',
    component:RedirigirComponent
  },
  {
    path:'usuario-verificado',
    component:UsuarioVerificadoComponent
  },

  {
    path: '**',
    redirectTo: 'main-page'
  }
];
