import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Caja } from '../../interfaces/interfaz-caja/interfazCaja.inteface';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
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
  cajas!: Caja[];
  indiceCaja: number = 0; // Índice de la caja actual

  posicion:number=0;
  auth=inject(AuthService);
  pokeservicio=inject(PokeservicesService);

  usarioServicio=inject(UsuarioService);

  private valuesubscription!:Subscription;


  usuario:Usuario= {id: "",
  box: this.pokeservicio.cajas,
  Username: "",
  Password: ""

  }
  datosDelId:string|undefined=this.auth.idDelUsuario;


  constructor(private pokeService: PokeservicesService) {
    // Asigna el observable `spriteActual$` desde el servicio
    this.spriteActual$ = this.pokeService.spriteActual$;
  }

  ngOnInit(): void {
    // Referencia a las cajas en el servicio
    this.dbUsuarioId(this.datosDelId);
    console.log(this.usuario);
    this.cajas = this.usuario.box;
    console.log("el dato es",this.cajas);

    this.valuesubscription=this.auth.guardarProgreso.subscribe((newValue) => {
      if (newValue) {
        this.dbGuardarDatos();
      }
    });

  }

  ngOnDestroy(): void {
     // Limpiar la suscripción cuando el componente se destruye
     if (this.valuesubscription) {
      this.valuesubscription.unsubscribe();
    }
  }

  dbUsuarioId(id:string|undefined){
    this.usarioServicio.getUsuarioById(id).subscribe(
    {
      next:(valor:Usuario)=>{
        this.usuario.Username=valor.Username;
        this.usuario.Password=valor.Password;


        this.usuario.box.map((caja)=>{
          this.usuario.box[this.posicion].imagen=caja.imagen;
          this.usuario.box[this.posicion].pokemones=caja.pokemones;
          this.posicion=this.posicion+1;
        })
        this.usuario.id=valor.id;

      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    }
    )
  }
  dbGuardarDatos()
  {
      this.usarioServicio.putUsuario(this.usuario,this.datosDelId).subscribe(
        {
          next:()=>{
            console.log("Usuario Guardado");
          },
          error:(e:Error)=>{

            console.log(e.message);

          }


        }
      )

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
