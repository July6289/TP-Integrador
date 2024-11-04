import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemonComponent } from "../equipo-pokemon/equipo-pokemon.component";
import { EquipoPokemon } from '../../interfazpokemon/interfazEquipo.interface';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';

@Component({
  selector: 'app-lista-equipo-pokemon',
  standalone: true,
  imports: [RouterModule, EquipoPokemonComponent],
  templateUrl: './lista-equipo-pokemon.component.html',
  styleUrl: './lista-equipo-pokemon.component.css'
})
export class ListaEquipoPokemonComponent {

  constructor(private router: Router, private equipoPokemonService: EquipoPokemonService){}

  equiposPokemon: EquipoPokemon | null = null;

  ngOnInit() {
    this.equipoPokemonService.equipoPokemon$.subscribe(equipo => {
      if (equipo) {
        this.equiposPokemon = equipo;
        console.log('Equipo Pokémon recibido:', this.equiposPokemon);
      }
    });
  }


  goToCrearEquipo()
  {
    this.router.navigate(['/equipo-pokemon']);
  }

}
