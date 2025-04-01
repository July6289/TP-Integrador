import { Component, ViewChild, viewChild } from '@angular/core';
import { ListaEquipoPokemonComponent } from "../lista-equipo-pokemon/lista-equipo-pokemon.component";
import { ListaPokemonComponent } from "../lista-pokemon/lista-pokemon.component";
import { CajaComponent } from "../caja/caja.component";
import { InfoPokedexComponent } from "../info-pokedex/info-pokedex.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Caja } from '../../interfaces/interfaz-caja/interfazCaja.inteface';
import { FavoritosComponent } from "../favoritos/favoritos.component";

@Component({
  selector: 'pagina-principal',
  standalone: true,
  imports: [ListaEquipoPokemonComponent, ListaPokemonComponent, CajaComponent, InfoPokedexComponent, CommonModule, FavoritosComponent],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})

export class PaginaPrincipalComponent {
  @ViewChild('caja') caja!:CajaComponent;

  guardarDatosDesdeInfoPokedex() {

      setTimeout(() => {

        this.caja.dbGuardarDatos();
      }, 1000);
  }
  constructor(private router: Router, private poke: PokeservicesService) { }
  color = 'brown';

  goToCombate() {
    this.router.navigate(['/selector']);
  }
}
