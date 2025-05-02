import { Component } from '@angular/core';
import { InfoObjetoComponent } from "./info-objeto/info-objeto.component";
import { InventarioObjetoComponent } from "./inventario-objeto/inventario-objeto.component";
import { BuscadorObjetoComponent } from "./buscador-objeto/buscador-objeto.component";

@Component({
  selector: 'app-lista-objetos',
  standalone: true,
  imports: [InfoObjetoComponent, InventarioObjetoComponent, BuscadorObjetoComponent],
  templateUrl: './lista-objetos.component.html',
  styleUrl: './lista-objetos.component.css'
})
export class ListaObjetosComponent {

}
