import { Component, inject, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';  // Importa Location
import { filter, timeout } from 'rxjs/operators';

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
  @Input() deseleccionarPokemon!: () => void;

  constructor(private router: Router, private location: Location) {}  // Inyecta Location

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
  numeroGeneracion?:number=undefined;  //numero de generacion ingresado en el buscador
  validacion:boolean=true;
  mensajeError:string='';


  seleccionarPokemon(indice: number) {
    this.pokemonSeleccionado = indice;
  }
  deseleccionar() {
    this.pokemonSeleccionado = null;
  }

  seleccionarPokemon2(indice: number) {
    this.pokemonSeleccionado = indice;

    if (this.pokemonSeleccionado !== null) {
      const pokemon = this.listaPokemon[this.pokemonSeleccionado];
      this.pokemonAgregado.emit(pokemon); // Emite el Pokémon seleccionado
      //this.listaPokemon.splice(this.pokemonSeleccionado, 1); // Elimina el Pokémon de la lista

      setTimeout(() => {
        this.pokemonSeleccionado = null;
      }, 1300);
    }
  }

  agregarPokemonAEquipo() {
    if (this.pokemonSeleccionado !== null) {
      const pokemon = this.listaPokemon[this.pokemonSeleccionado];
      this.pokemonAgregado.emit(pokemon); // Emite el Pokémon seleccionado
      this.listaPokemon.splice(this.pokemonSeleccionado, 1); // Elimina el Pokémon de la lista
      this.pokemonSeleccionado = null; // Reinicia la selección
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
    if (this.numeroGeneracion !=undefined) {
      if(this.numeroGeneracion<=0)
      {

        this.validacion=false;
        this.mensajeError='numero de generacion invalido';
      }
      else
      {
      this.validacion=true;
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
              this.listaPokemon.sort((a,b)=>a.id-b.id) //ordeno por id
            }
            else{
              this.validacion=false;
              this.mensajeError='el numero de generación no esta disponible';
            }

          }
        }

      )
    }
    } else {
      this.validacion=false;
      this.mensajeError='campos invalidos, ingrese datos validos';
    }
  }







}
