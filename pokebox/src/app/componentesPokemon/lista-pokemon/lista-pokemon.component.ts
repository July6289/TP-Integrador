import { Component, inject, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';

@Component({
  selector: 'app-lista-pokemon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.css']
})

export class ListaPokemonComponent implements OnInit {
  listaPokemon: Pokemon[] = [];
  pokemonSeleccionado: number | null = null;
  @Output() pokemonAgregado = new EventEmitter<Pokemon>();
  mostrarBotonAgregar = true;

  constructor(private router: Router, private location: Location) { }  // Inyecta Location

  ngOnInit(): void {
    this.checkRoute();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();  // Llama a la función checkRoute en cada cambio de URL
    });
  }

  checkRoute(): void {
    // Obtiene la ruta actual y verifica si es "/equipo-pokemon"
    this.mostrarBotonAgregar = !this.location.path().includes('/equipo-pokemon');
  }

  pokeService = inject(PokeservicesService);
  numeroGeneracion?: number = undefined;  //numero de generacion ingresado en el buscador
  validacion: boolean = true;
  mensajeError: string = '';

  seleccionarPokemon(indice: number) {
    this.pokemonSeleccionado = indice;
  }

  seleccionarPokemon2(indice: number) {
    this.pokemonSeleccionado = indice;

    if (this.pokemonSeleccionado !== null) {
      const pokemon = this.listaPokemon[this.pokemonSeleccionado];
      this.pokemonAgregado.emit(pokemon); // Emite el Pokémon seleccionado

      setTimeout(() => {
        this.pokemonSeleccionado = null;
      }, 1300);
    }
  }

  agregarPokemonACaja() {
    if (this.pokemonSeleccionado !== null) {
      const pokemon = this.listaPokemon[this.pokemonSeleccionado];
      this.pokemonAgregado.emit(pokemon);
      this.listaPokemon.splice(this.pokemonSeleccionado, 1);
      this.pokemonSeleccionado = null;
    }
  }

  buscarPokemonPorGeneracion() {
    if (this.numeroGeneracion != undefined) {
      if (this.numeroGeneracion <= 0) {
        this.validacion = false;
        this.mensajeError = 'numero de generacion invalido';
      }
      else {
        this.validacion = true;
        this.pokeService.getPokemonByGeneration(this.numeroGeneracion).subscribe(
          {
            next: (respuesta) => {
              if (respuesta != undefined) {
                this.listaPokemon = [];
                respuesta.pokemon_species.map((pokemonEspecie) => {
                  this.pokeService.getPokemonByName(pokemonEspecie.name).subscribe(
                    {
                      next: (poke: Pokemon | undefined) => {
                        if (poke != undefined) {
                          this.listaPokemon.push(poke);
                        }
                      }
                    }
                  )
                })
                setTimeout(() => { this.listaPokemon.sort((a, b) => a.id - b.id) }, 1000);//ordeno por id //y le dejo un tiempo de espera
              }
              else {
                this.validacion = false;
                this.mensajeError = 'el numero de generación no esta disponible';
              }
            }
          }
        )
      }
    } else {
      this.validacion = false;
      this.mensajeError = 'campos invalidos, ingrese datos validos';
    }
  }

  agregarPokemonDirectamente(indice: number): void {
    this.pokemonSeleccionado = indice;
    setTimeout(() => {
      const pokemon = this.listaPokemon[indice];
      this.pokemonAgregado.emit(pokemon);
      this.listaPokemon.splice(indice, 1);
      this.pokemonSeleccionado = null;
    }, 100); // Delay suave
  }

  @Output() pokemonAgregadoDirectamente = new EventEmitter<Pokemon>();

  agregarDirectamenteAEequipo(indice: number): void {
    const pokemon = this.listaPokemon[indice];
    this.pokemonAgregadoDirectamente.emit(pokemon);
  }
}
