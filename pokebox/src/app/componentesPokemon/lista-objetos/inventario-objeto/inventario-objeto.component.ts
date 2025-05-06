import { Component } from '@angular/core';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';

@Component({
  selector: 'app-inventario-objeto',
  standalone: true,
  imports: [],
  templateUrl: './inventario-objeto.component.html',
  styleUrl: './inventario-objeto.component.css'
})
export class InventarioObjetoComponent {
  private pokeObjetos: Objeto = {
    nombre: "",
    descripcion:"",
    generacion: 0,
    sprite: ""
  };
}
