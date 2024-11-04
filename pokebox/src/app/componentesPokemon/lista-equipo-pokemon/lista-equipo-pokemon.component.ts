import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { EquipoPokemonComponent } from "../equipo-pokemon/equipo-pokemon.component";
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { NgFor } from '@angular/common';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';

@Component({
  selector: 'app-lista-equipo-pokemon',
  standalone: true,
  imports: [RouterModule, EquipoPokemonComponent, NgFor],
  templateUrl: './lista-equipo-pokemon.component.html',
  styleUrl: './lista-equipo-pokemon.component.css'
})

export class ListaEquipoPokemonComponent {

  constructor(private router: Router, private equipoPokemonService: EquipoPokemonService) { }

  poketeam: EquipoPokemon[]=[];

  ngOnInit() {
    this.equipoPokemonService.equipoPokemon$.subscribe(equipo => {
    
      if (equipo) {
        this.agregarElemento(equipo, this.poketeam.length);
        console.log('Equipo Pokémon recibido:', this.poketeam);
       
      }
    });
  }

  // Añadir un nuevo elemento
  agregarElemento(nuevoElemento: EquipoPokemon, index: number) {
    if (nuevoElemento) {
      // Modificar la posición específica
      this.poketeam[index] = nuevoElemento;
      // Forzar la actualización de la vista creando una nueva referencia del array
      this.poketeam = [...this.poketeam];
    }
  }

  // Eliminar un elemento específico
  eliminarElemento(index: number) {
    this.poketeam.splice(index, 1);
  }

  goToCrearEquipo()
  {
    this.router.navigate(['/equipo-pokemon']);
  }

}
