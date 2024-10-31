import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-equipo-pokemon',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lista-equipo-pokemon.component.html',
  styleUrl: './lista-equipo-pokemon.component.css'
})
export class ListaEquipoPokemonComponent {

  constructor(private router: Router)
  {}

  goToCrearEquipo()
  {
    this.router.navigate(['/equipo-pokemon']);
  }

}
