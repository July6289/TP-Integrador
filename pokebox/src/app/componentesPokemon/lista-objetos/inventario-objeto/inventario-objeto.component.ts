import { Component, OnInit } from '@angular/core';
import { ObjetoService } from '../../../pokeservices/objeto.service';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario-objeto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario-objeto.component.html',
  styleUrl: './inventario-objeto.component.css'
})
export class InventarioObjetoComponent implements OnInit {
  pokeObjetos: { objeto: Objeto, cantidad: number }[] = [];
  cantidades: { [nombre: string]: number } = {};

  constructor(private objetoService: ObjetoService) {}

  editandoCantidad: { [nombre: string]: boolean } = {};

cambiarCantidad(nombre: string) {
  this.editandoCantidad[nombre] = true; // Muestra el input
}

guardarCantidad(nombre: string) {
  const nuevaCantidad = this.cantidades[nombre];
  if (nuevaCantidad > 0 && nuevaCantidad < 100) {
    this.objetoService.cambiarCantidad(nombre, nuevaCantidad);
    this.editandoCantidad[nombre] = false; // Oculta el input nuevamente
  } else {
    alert('Cantidad inválida');
  }
}

  ngOnInit(): void {
    this.objetoService.inventario$.subscribe(data => {
      this.pokeObjetos = data;
      // Inicializamos valores por defecto en inputs
      this.cantidades = {};
      data.forEach(item => {
        this.cantidades[item.objeto.nombre] = item.cantidad;
      });
    });
  }

  eliminar(nombre: string) {
    this.objetoService.eliminarObjeto(nombre);
  }


}
