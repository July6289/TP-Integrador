import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { Observable, Subscription } from 'rxjs';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})

export class CajaComponent implements OnInit, OnDestroy {
  private readonly MAX_POKEMON = 30; // Límite máximo de Pokémon en cada caja
  pokemonSeleccionado: Pokemon | null = null;  // Índice del Pokémon seleccionado

  // Cambia `spriteActual` a `spriteActual$` como Observable
  spriteActual$: Observable<string | null>;
  indiceCaja: number = 0; // Índice de la caja actual

  flag: boolean = false;

  posicion: number = 0;
  pokeservicio = inject(PokeservicesService);
  secretId: string = ""
  usarioServicio = inject(UsuarioService);
  private valuesubscription!: Subscription;


  usuario: Usuario = {
    id: "",
    box: this.pokeservicio.cajas,
    Username: "",
    Password: ""
  }

  constructor(private pokeService: PokeservicesService) {
    // Asigna el observable `spriteActual$` desde el servicio
    this.spriteActual$ = this.pokeService.spriteActual$;
  }

  ngOnInit(): void {
    // Referencia a las cajas en el servicio
    this.secretId = this.usarioServicio.enviarId()

    this.dbUsuarioId()
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción cuando el componente se destruye
    if (this.valuesubscription) {
      this.valuesubscription.unsubscribe();
    }
  }

  dbUsuarioId() {
    console.log("hola mi id: ");

    if(this.secretId){
      console.log(this.secretId);
    }
    else
    {
      console.log("no cargo papi");

    }

    this.usarioServicio.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario = valor;

          console.log(this.usuario);

        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

  dbGuardarDatos() {
    console.log(this.usuario.Password);
    console.log(this.usuario.Username);

    if (this.flag && this.usuario.Password !== "") {
      this.usarioServicio.putUsuario(this.usuario, this.secretId).subscribe(
        {
          next: () => {
            console.log("Usuario Guardado");
          },
          error: (e: Error) => {
            console.log(e.message);
          }
        }
      )
    }
  }

  // Método getter para obtener la lista de Pokémon de la caja actual
  get pokemonesEnCaja(): Pokemon[] {
    return this.usuario.box[this.indiceCaja].pokemones;
  }

  // Método getter para obtener la imagen de la caja actual
  get imagenCaja(): string {

    return this.usuario.box[this.indiceCaja].imagen;
  }

  // Método getter para obtener el nombre de la caja actual
  get nombreCaja(): string {
    return `Caja ${this.indiceCaja + 1}`;
  }

  // Método para agregar un Pokémon a la caja actual
  agregarPokemon(pokemon: Pokemon) {
    if (this.usuario.box[this.indiceCaja].pokemones.length < this.MAX_POKEMON) {
      this.usuario.box[this.indiceCaja].pokemones.push(pokemon);
      this.flag = true;
    } else {
      alert('No se pueden agregar más Pokémon a la caja. Límite alcanzado.');
    }
  }

  // Cambiar a la caja anterior
  cambiarCajaAnterior() {
    if (this.indiceCaja > 0) {
      this.indiceCaja--;
    } else {
      this.indiceCaja = this.pokeService.TOTAL_CAJAS - 1;
    }
  }

  // Cambiar a la caja siguiente
  cambiarCajaSiguiente() {
    if (this.indiceCaja < this.pokeService.TOTAL_CAJAS - 1) {
      this.indiceCaja++;
    } else {
      this.indiceCaja = 0;
    }
  }

  // Método para manejar el clic en el Pokémon
  onPokemonClick(pokemon: Pokemon): void {
    this.pokemonSeleccionado = pokemon;
    this.flag = true;
    this.pokeService.setSelectedPokemon(pokemon); // Establecer el Pokémon seleccionado en el servicio
  }

  getSpriteUrl(pokemon: Pokemon): string {
    if (pokemon.isMale === undefined || pokemon.isShiny === undefined) {
      return pokemon.sprites.front_default; // Sprite por defecto si no hay configuración
    }

    if (pokemon.isMale && pokemon.isShiny) {
      return pokemon.sprites.front_shiny;
    } else if (pokemon.isMale && !pokemon.isShiny) {
      return pokemon.sprites.front_default;
    } else if (!pokemon.isMale && pokemon.isShiny) {
      return pokemon.sprites.front_shiny_female || pokemon.sprites.front_shiny;
    } else {
      return pokemon.sprites.front_female || pokemon.sprites.front_default;
    }
  }
}
