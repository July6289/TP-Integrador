import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { EquipoPokemonComponent } from "../equipo-pokemon/equipo-pokemon.component";
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { NgFor, Location, NgIf } from '@angular/common';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';

@Component({
  selector: 'app-lista-equipo-pokemon',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './lista-equipo-pokemon.component.html',
  styleUrl: './lista-equipo-pokemon.component.css'
})

export class ListaEquipoPokemonComponent {

  constructor(private router: Router, private equipoPokemonService: EquipoPokemonService, private location:Location) { }

  poketeam: EquipoPokemon[]=[];

  ngOnInit() {
    // Suscribirse a todos los equipos
    this.equipoPokemonService.equipos$.subscribe(equipos => {
      this.poketeam = equipos;  // Actualiza el arreglo con todos los equipos
    });
    this.checkRoute();
  }

  rutaCombate=true;



  checkRoute():void
  {
    this.rutaCombate= this.location.path().includes('/main-page');
  }

 /* agregarElemento(nuevoElemento: EquipoPokemon, index: number) {
    if (nuevoElemento) {
      // Modificar la posición específica
      this.poketeam[index] = nuevoElemento;
      // Forzar la actualización de la vista creando una nueva referencia del array
      this.poketeam = [...this.poketeam];
    }
  }*/

  // Eliminar un elemento específico
  eliminarElemento(index: number) {
    this.equipoPokemonService.eliminarEquipo(index);
  }

  goToCrearEquipo()
  {
    this.router.navigate(['/equipo-pokemon']);
  }

  gotoMain()
  {
    this.router.navigate(['/**']);
  }

  seleccionarEquipo(team : EquipoPokemon)
  {
    console.log(team);
    this.router.navigate(['/combate'])

  }


  goToVisualizarpokemon(nombre: string)
  {
    console.log(`Navegando a equipo con nombre: ${nombre}`);
    this.router.navigate(['/equipo', nombre]);
  }

  cambiarNombreEquipo(index: number) {
    const nuevoNombre = prompt('Introduce un nuevo nombre para el equipo (Máximo 14 caracteres)', 'Nuevo nombre');
    if (nuevoNombre && nuevoNombre.length <= 14) {
      this.equipoPokemonService.actualizarNombreEquipo(index, nuevoNombre);
    } else {
      alert('El nombre debe tener entre 1 y 14 caracteres.');
    }
  }
}
