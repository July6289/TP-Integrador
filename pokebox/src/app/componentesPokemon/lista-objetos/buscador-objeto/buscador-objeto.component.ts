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
  servicioObjeto = inject(ObjetoService);
  objetosFiltrados: Objeto[] = [];

  ngOnInit(): void {
    this.nombreObjeto = '';
  }

  buscarObjeto() {
    if (this.nombreObjeto.length > 0) {
      this.servicioObjeto.getItemsByPartialName(this.nombreObjeto).subscribe({
        next: (objetos) => {
          // Agregar la propiedad cantidad a cada objeto
          this.objetosFiltrados = objetos.map(obj => ({
            ...obj,
            cantidad: 1 // default
          }));

          if (this.objetosFiltrados.length === 0) {
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

  agregarAlInventario(objeto: Objeto & { cantidad: number }) {
    const cantidad = objeto.cantidad;
    if (cantidad > 0 && cantidad < 100 && cantidad % 1 === 0) {
      this.servicioObjeto.agregarObjeto(objeto, cantidad);
    } else {
      alert('Cantidad incorrecta');
    }
  }
}

