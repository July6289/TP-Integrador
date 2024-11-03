import { Component } from '@angular/core';
import { ListaPokemonComponent } from "../lista-pokemon/lista-pokemon.component";

@Component({
  selector: 'app-equipo-pokemon',
  standalone: true,
  imports: [ListaPokemonComponent],
  templateUrl: './equipo-pokemon.component.html',
  styleUrl: './equipo-pokemon.component.css'
})
export class EquipoPokemonComponent {

}
