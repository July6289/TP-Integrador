import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemonComponent } from "../equipo-pokemon/equipo-pokemon.component";

@Component({
  selector: 'app-lista-equipo-pokemon',
  standalone: true,
  imports: [RouterModule, EquipoPokemonComponent],
  templateUrl: './lista-equipo-pokemon.component.html',
  styleUrl: './lista-equipo-pokemon.component.css'
})
export class ListaEquipoPokemonComponent {

  constructor(private router: Router)
  {}

  equiposPokemon: Pokemon[] = [];

  manejarEquipoCompleto(equipo: Pokemon[]) {
    this.equiposPokemon = equipo;
    console.log('Equipo Pokémon recibido:', this.equiposPokemon);
    // Aquí puedes manejar la lógica que necesites con el equipo recibido
  }

  goToCrearEquipo()
  {
    this.router.navigate(['/equipo-pokemon']);
  }

}
