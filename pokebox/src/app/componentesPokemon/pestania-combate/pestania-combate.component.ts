import { Component } from '@angular/core';
import { ListaEquipoPokemonComponent } from "../lista-equipo-pokemon/lista-equipo-pokemon.component";

@Component({
  selector: 'app-pestania-combate',
  standalone: true,
  imports: [ListaEquipoPokemonComponent],
  templateUrl: './pestania-combate.component.html',
  styleUrl: './pestania-combate.component.css'
})
export class PestaniaCombateComponent {

}
