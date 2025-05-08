import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { ObjetoService } from '../../../pokeservices/objeto.service';

@Component({
  selector: 'app-buscador-objeto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador-objeto.component.html',
  styleUrl: './buscador-objeto.component.css'
})
export class BuscadorObjetoComponent implements OnInit {
  nombreObjeto: string = '';
  cantidad: number = 1;

  servicioObjeto = inject(ObjetoService);

  objeto: Objeto = {
    nombre: '',
    descripcion: '',
    generacion: 0,
    sprite: '',
  };

  ngOnInit(): void {
    this.nombreObjeto = '';
  }

  buscarObjeto() {
    if (this.nombreObjeto.length > 0) {
      this.servicioObjeto.getItemByName(this.nombreObjeto).subscribe({
        next: (objeto) => {
          if (objeto) {
            this.objeto = { ...objeto };
          } else {
            alert('Ese nombre no existe');
          }
        }
      });
    } else {
      alert('No ingresó nada');
    }
  }

  agregarAlInventario() {
    if (this.objeto.nombre && this.cantidad > 0 && this.cantidad < 100) {
      this.servicioObjeto.agregarObjeto(this.objeto, this.cantidad);
      this.nombreObjeto = '';
      this.objeto = { nombre: '', descripcion: '', generacion: 0, sprite: '' };
      this.cantidad = 1;
    } else {
      alert('No hay objeto válido o cantidad incorrecta');
    }
  }
}

