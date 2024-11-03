import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';

interface Caja {
  imagen: string;          // Ruta de la imagen de la caja
  pokemones: Pokemon[];    // Lista de Pokémon en esta caja
}

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent {
  @Output() pokemonSeleccionado = new EventEmitter<Pokemon>(); // Emisor para el Pokémon seleccionado

  private readonly MAX_POKEMON = 30; // Límite máximo de Pokémon en cada caja
  private readonly TOTAL_CAJAS = 32;  // Número total de cajas disponibles

  // Arreglo de cajas, inicializadas con imágenes y listas vacías de Pokémon
  cajas: Caja[] = Array.from({ length: this.TOTAL_CAJAS }, (_, index) => ({
    imagen: `/assets/imagenes/cajas/${index + 1}.png`, // Ruta de imagen dinámica
    pokemones: []                                       // Pokémon iniciales vacíos
  }));

  indiceCaja: number = 0;             // Índice de la caja actual

  get pokemonesEnCaja(): Pokemon[] {
    return this.cajas[this.indiceCaja].pokemones; // Lista de Pokémon de la caja actual
  }

  get imagenCaja(): string {
    return this.cajas[this.indiceCaja].imagen; // Imagen de la caja actual
  }

  get nombreCaja(): string {
    return `Caja ${this.indiceCaja + 1}`; // Nombre de la caja actual
  }

  agregarPokemon(pokemon: Pokemon) {
    const cajaActual = this.cajas[this.indiceCaja];
    if (cajaActual.pokemones.length < this.MAX_POKEMON) {
      cajaActual.pokemones.push(pokemon);
    } else {
      console.warn('No se pueden agregar más Pokémon a la caja. Límite alcanzado.');
    }
  }

  cambiarCajaAnterior() {
    if (this.indiceCaja > 0) {
      this.indiceCaja--;
    }
    else {
      this.indiceCaja = this.TOTAL_CAJAS - 1
    }
  }

  cambiarCajaSiguiente() {
    if (this.indiceCaja < this.TOTAL_CAJAS - 1) {
      this.indiceCaja++;
    }
    else {
      this.indiceCaja = 0;
    }
  }

  // Nueva función para manejar el clic en un Pokémon
  seleccionarPokemon(pokemon: Pokemon) {
    this.pokemonSeleccionado.emit(pokemon);
  }
}
