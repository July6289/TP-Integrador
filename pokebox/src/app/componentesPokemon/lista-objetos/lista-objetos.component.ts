import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoObjetoComponent } from "./info-objeto/info-objeto.component";
import { InventarioObjetoComponent } from "./inventario-objeto/inventario-objeto.component";
import { BuscadorObjetoComponent } from "./buscador-objeto/buscador-objeto.component";
import { CommonModule } from '@angular/common';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { TutorialService } from '../../pokeservices/tutorial.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-objetos',
  standalone: true,
  imports: [InfoObjetoComponent, InventarioObjetoComponent, BuscadorObjetoComponent, CommonModule],
  templateUrl: './lista-objetos.component.html',
  styleUrl: './lista-objetos.component.css'
})

export class ListaObjetosComponent implements OnInit, OnDestroy {
  constructor(private tutorialService: TutorialService) { }

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
