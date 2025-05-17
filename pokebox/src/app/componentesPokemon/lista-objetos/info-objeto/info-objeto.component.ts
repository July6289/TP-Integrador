import { Component, OnInit } from '@angular/core';
import { ObjetoService } from '../../../pokeservices/objeto.service';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-info-objeto',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './info-objeto.component.html',
  styleUrl: './info-objeto.component.css'
})

export class InfoObjetoComponent implements OnInit {
  objetoSeleccionado: Objeto | null = null;

  constructor(private objetoService: ObjetoService) {}

  ngOnInit(): void {
    this.objetoService.objetoSeleccionado$.subscribe(objeto => {
      this.objetoSeleccionado = objeto;
    });
  }
}
