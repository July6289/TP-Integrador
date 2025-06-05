import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { AuthService } from '../../auth/service/auth.service';
import { CajaService } from '../../pokeservices/caja.service';


@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})

export class CajaComponent implements OnInit {
  private readonly MAX_POKEMON = 30; // Límite máximo de Pokémon en cada caja
  pokemonSeleccionado: Pokemon | null = null;  // Índice del Pokémon seleccionado

  // Cambia `spriteActual` a `spriteActual$` como Observable
  spriteActual$: Observable<string | null>;
  indiceCaja: number = 0; // Índice de la caja actual
  flag: boolean = false;
  posicion: number = 0;
  pokeservicio = inject(PokeservicesService);
  secretId: string | null = ""
  usarioServicio = inject(UsuarioService);
  pokeservice = inject(PokeservicesService)
  auth = inject(AuthService);

  usuario: Usuario = {
    id: "",
    box: [],
    Email: "",
    Username:"",
    Password: "",
    UrlImagenPerfil:'',
    CombatesGanados: 0,
    ListaFavoritos: [],
    ListaObjetos: [],
    ListaEquipos: []
  }

  constructor(private pokeService: PokeservicesService, private cajaService: CajaService) {
    // Asigna el observable `spriteActual$` desde el servicio
    this.spriteActual$ = this.pokeService.spriteActual$;
  }

  ngOnInit(): void {
    this.secretId = this.auth.getTokenValue();
    this.dbUsuarioId();
    setTimeout(() => {
      if (this.usuario.ListaFavoritos.length > 0) {
        this.pokeService.setFavoritos(this.usuario.ListaFavoritos)
      }
    }, 300);
  }

  dbUsuarioId() {
    this.usarioServicio.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;
          this.usuario.Password = valor.Password
          this.usuario.Username=valor.Username
          this.usuario.id = valor.id
          this.usuario.CombatesGanados = valor.CombatesGanados;
          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco
          this.usuario.UrlImagenPerfil=valor.UrlImagenPerfil
          //la forma definitiva de evitar el undefined
          this.usuario.box = this.pokeservice.cajas
          valor.box.map((caja) => {

            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion = this.posicion + 1;
          })

          this.usuario.ListaFavoritos = [...valor.ListaFavoritos];
          this.usuario.ListaObjetos = [...valor.ListaObjetos];
          this.usuario.ListaEquipos = [...valor.ListaEquipos]
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

  dbGuardarDatos() {
    this.cajaService.dbGuardarDatos(this.usuario, this.secretId || '');
  }

  get pokemonesEnCaja(): Pokemon[] {
    return this.usuario.box?.[this.indiceCaja]?.pokemones || []; // Devolver array vacío si es indefinido
  }

  get imagenCaja(): string {
    return this.usuario.box?.[this.indiceCaja]?.imagen || '/assets/imagenes/cajas/1.png'; // Imagen por defecto
  }

  // Método getter para obtener el nombre de la caja actual
  get nombreCaja(): string {
    return `Caja ${this.indiceCaja + 1}`;
  }

  // Método para agregar un Pokémon a la caja actual
  agregarPokemon(pokemon: Pokemon) {
    if (this.usuario.box[this.indiceCaja].pokemones.length < this.MAX_POKEMON) {
      console.log(pokemon)
      this.usuario.box[this.indiceCaja].pokemones.push(pokemon);
      this.flag = true;
      this.dbGuardarDatos();
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

  mostrarMenu: boolean = false;
  contextPokemon: Pokemon | null = null;
  contextMenuX: number = 0;
  contextMenuY: number = 0;

  // Evento click derecho
  onRightClick(event: MouseEvent, pokemon: Pokemon) {
    event.preventDefault();
    this.contextPokemon = pokemon;
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.mostrarMenu = true;
  }

  // Agregar a favoritos
  agregarAFavoritosDesdeMenu() {
    if (this.contextPokemon) {
      this.pokeservicio.agregarAFavoritos(this.contextPokemon);
    }

    this.mostrarMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Cierra el menú solo si NO hizo click dentro del menú contextual
    if (!target.closest('.context-menu')) {
      this.mostrarMenu = false;
    }
  }

  eliminarDeCajaDesdeMenu() {
    if (!this.contextPokemon) return;

    const pokemones = this.usuario.box[this.indiceCaja].pokemones;
    const index = pokemones.findIndex(p => p.id === this.contextPokemon!.id);

    if (index !== -1) {
      pokemones.splice(index, 1);
      this.dbGuardarDatos(); // Guardamos el estado actualizado
      this.mostrarMenu = false;
    }
  }
}
