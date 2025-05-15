import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { ObjetoService } from '../../../pokeservices/objeto.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-buscador-objeto',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './buscador-objeto.component.html',
  styleUrl: './buscador-objeto.component.css'
})
export class BuscadorObjetoComponent implements OnInit {
  nombreObjeto: string = '';
  cantidad: number = 1;

  servicioObjeto = inject(ObjetoService);

  objetosFiltrados: Objeto[] = [];

  ngOnInit(): void {
    this.nombreObjeto = '';
  }

    buscarObjeto() {
    if (this.nombreObjeto.length > 0) {
      this.servicioObjeto.getItemsByPartialName(this.nombreObjeto).subscribe({
        next: (objetos) => {
          this.objetosFiltrados = objetos;
          if (objetos.length === 0) {
            alert('No se encontraron objetos que coincidan');
          }
        },
        error: () => {
          alert('Error al buscar objetos');
        }
      });
    } else {
      alert('No ingresó nada');
    }
  }

  agregarAlInventario(objeto: Objeto) {
    if (this.cantidad > 0 && this.cantidad < 100 && this.cantidad % 1 === 0) {

      this.servicioObjeto.agregarObjeto(objeto, this.cantidad);

      this.nombreObjeto = '';
      this.objetosFiltrados = [];
      this.cantidad = 1;
    } else {
      alert('Cantidad incorrecta');
    }
  }

}

