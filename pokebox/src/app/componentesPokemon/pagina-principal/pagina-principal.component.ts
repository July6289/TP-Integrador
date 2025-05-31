import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListaEquipoPokemonComponent } from "../lista-equipo-pokemon/lista-equipo-pokemon.component";
import { ListaPokemonComponent } from "../lista-pokemon/lista-pokemon.component";
import { CajaComponent } from "../caja/caja.component";
import { InfoPokedexComponent } from "../info-pokedex/info-pokedex.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from "../favoritos/favoritos.component";
import { Subscription } from 'rxjs';
import { TutorialService } from '../../pokeservices/tutorial.service';
import { TutorialComponent } from '../tutorial/tutorial.component';

@Component({
  selector: 'pagina-principal',
  standalone: true,
  imports: [ListaEquipoPokemonComponent, ListaPokemonComponent, CajaComponent, InfoPokedexComponent, CommonModule, FavoritosComponent],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})

export class PaginaPrincipalComponent implements OnInit, OnDestroy {
  @ViewChild('caja') caja!: CajaComponent;

  constructor(private router: Router, private tutorialService: TutorialService) { }

  goToCombate() {
    this.router.navigate(['/selector']);
  }

  guardarDatosDesdeInfoPokedex() {
    setTimeout(() => {
      this.caja.dbGuardarDatos();
    }, 1000);
  }

  mostrarTutorial: boolean = false;
  private tutorialSub?: Subscription;

  ngOnInit() {
    this.tutorialSub = this.tutorialService.mostrarTutorial$.subscribe(
      mostrar => this.mostrarTutorial = mostrar
    );
  }

  cerrarTutorial() {
    this.tutorialService.ocultarTutorial();
  }

  ngOnDestroy() {
    this.tutorialSub?.unsubscribe();
  }
}
