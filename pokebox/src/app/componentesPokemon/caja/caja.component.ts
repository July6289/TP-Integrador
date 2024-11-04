import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Caja } from '../../interfaces/interfaz-caja/interfazCaja.inteface';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})

export class CajaComponent {
  private readonly MAX_POKEMON = 30; // Límite máximo de Pokémon en cada caja
  private readonly TOTAL_CAJAS = 32;  // Número total de cajas disponibles
  pokemonSeleccionado: Pokemon | null = null;  // Índice del Pokémon seleccionado

  // Cambia `spriteActual` a `spriteActual$` como Observable
  spriteActual$: Observable<string | null>;

  // Arreglo de cajas, inicializadas con imágenes y listas vacías de Pokémon
  cajas: Caja[] = Array.from({ length: this.TOTAL_CAJAS }, (_, index) => ({
    imagen: `/assets/imagenes/cajas/${index + 1}.png`, // Ruta de imagen dinámica
    pokemones: []                                       // Pokémon iniciales vacíos
  }));

  indiceCaja: number = 0; // Índice de la caja actual

  constructor(private pokeService: PokeservicesService) {
    // Asigna el observable `spriteActual$` desde el servicio
    this.spriteActual$ = this.pokeService.spriteActual$;
  }

  // Método getter para obtener la lista de Pokémon de la caja actual
  get pokemonesEnCaja(): Pokemon[] {
    return this.cajas[this.indiceCaja].pokemones;
  }

  // Método getter para obtener la imagen de la caja actual
  get imagenCaja(): string {
    return this.cajas[this.indiceCaja].imagen;
  }

  // Método getter para obtener el nombre de la caja actual
  get nombreCaja(): string {
    return `Caja ${this.indiceCaja + 1}`;
  }

  // Método para agregar un Pokémon a la caja actual
  agregarPokemon(pokemon: Pokemon) {
    const cajaActual = this.cajas[this.indiceCaja];
    if (cajaActual.pokemones.length < this.MAX_POKEMON) {
      cajaActual.pokemones.push(pokemon);
    } else {
      console.warn('No se pueden agregar más Pokémon a la caja. Límite alcanzado.');
    }
  }

  // Cambiar a la caja anterior
  cambiarCajaAnterior() {
    if (this.indiceCaja > 0) {
      this.indiceCaja--;
    } else {
      this.indiceCaja = this.TOTAL_CAJAS - 1;
    }
  }

  // Cambiar a la caja siguiente
  cambiarCajaSiguiente() {
    if (this.indiceCaja < this.TOTAL_CAJAS - 1) {
      this.indiceCaja++;
    } else {
      this.indiceCaja = 0;
    }
  }

  // Método para manejar el clic en el Pokémon
  onPokemonClick(pokemon: Pokemon): void {
    this.pokemonSeleccionado = pokemon;
    this.pokeService.setSelectedPokemon(pokemon); // Establecer el Pokémon seleccionado en el servicio
  }
}
