import { Component } from '@angular/core';
import { PerfilComponent } from '../perfil/perfil.component';
import { ListaEquipoPokemonComponent } from "../lista-equipo-pokemon/lista-equipo-pokemon.component";
import { ListaPokemonComponent } from "../lista-pokemon/lista-pokemon.component";
import { CajaComponent } from "../caja/caja.component";
import { InfoPokedexComponent } from "../info-pokedex/info-pokedex.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagina-principal',
  standalone: true,
  imports: [PerfilComponent, ListaEquipoPokemonComponent, ListaPokemonComponent, CajaComponent, InfoPokedexComponent, CommonModule],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {
  constructor(private router: Router) { }
  color = 'brown';

  goToCombate()
  {
    this.router.navigate(['/combate']);
  }
  
  goToPerfil() {
    this.router.navigate(['/perfil']);
  }
}
