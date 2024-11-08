import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';

@Component({
  selector: 'app-visualizar-equipo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizar-equipo.component.html',
  styleUrl: './visualizar-equipo.component.css'
})
export class VisualizarEquipoComponent implements OnInit {
  pokemonesEnEquipo: Pokemon[] = [];
  nombreEquipo: string = '';

  constructor(
    private route: ActivatedRoute,
    private equipoPokemonService: EquipoPokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'nombre' de la URL
    this.route.paramMap.subscribe(params => {
      this.nombreEquipo = params.get('nombre')!;
      this.obtenerEquipo(this.nombreEquipo);
    });
  }

  gotoMainMenu(){
    this.router.navigate(['/**']);
  }

  gotoCombate(){
    this.router.navigate(['/combate']);
  }


  obtenerEquipo(nombre: string): void {
    const equipo = this.equipoPokemonService.obtenerEquipoPorNombre(nombre);
    if (equipo) {
      this.pokemonesEnEquipo = equipo.equipo;
    } else {
      console.error('Equipo no encontrado');
      // Aquí podrías mostrar un mensaje de error o redirigir a otra página si el equipo no se encuentra
    }
  }


}
