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
      if(this.poketeam.length===0 && equipo)
      {
        this.poketeam[0] = equipo;
        console.log('Equipo Pokémon recibido:', this.poketeam);
      }
      if (equipo) {
        this.poketeam[this.poketeam.length-1] = equipo;
        console.log('Equipo Pokémon recibido:', this.poketeam);
      }
    });
  }

  // Añadir un nuevo elemento
  agregarElemento(nuevoElemento: EquipoPokemon) {
    if (nuevoElemento) {
      this.poketeam.push(nuevoElemento);
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
