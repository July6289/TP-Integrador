import { Component, inject, OnInit } from '@angular/core';
import { ObjetoService } from '../../../pokeservices/objeto.service';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-inventario-objeto',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './inventario-objeto.component.html',
  styleUrl: './inventario-objeto.component.css'
})
export class InventarioObjetoComponent implements OnInit {
  pokeObjetos: { objeto: Objeto, cantidad: number }[] = [];

  constructor(private objetoService: ObjetoService) {}

  ngOnInit(): void {
    this.objetoService.inventario$.subscribe(data => {
      this.pokeObjetos = data;
    });
  }
}
