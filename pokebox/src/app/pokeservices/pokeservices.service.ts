import { Generation } from './../interfaces/interfazpokemon/Generacion.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, forkJoin } from 'rxjs';
import { Pokemon, Sprites, Type } from '../interfaces/interfazpokemon/Pokemon.inteface';
import { Caja } from '../interfaces/interfaz-caja/Caja.inteface';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../interfaces/interfaz-usuario/Usuario.interface';

@Injectable({
  providedIn: 'root'
})

export class PokeservicesService {
  readonly TOTAL_CAJAS = 32;  // Número total de cajas disponibles

  // Arreglo de cajas, accesible para cualquier componente
  cajas: Caja[] = Array.from({ length: this.TOTAL_CAJAS }, (_, index) => ({
    imagen: `/assets/imagenes/cajas/${index + 1}.png`, // Ruta de imagen dinámica
    pokemones: []                                       // Pokémon iniciales vacíos
  }));
  // BehaviorSubject para emitir actualizaciones de cajas
  private cajasSubject = new BehaviorSubject<Caja[]>(this.cajas);
  cajas$ = this.cajasSubject.asObservable();
  usuarioService = inject(UsuarioService);
  private selectedPokemonSubject = new BehaviorSubject<Pokemon | null>(null); // BehaviorSubject para el Pokémon seleccionado
  selectedPokemon$ = this.selectedPokemonSubject.asObservable(); // Observable para suscribirse a los cambios
  // Nueva propiedad para mantener el sprite actual del Pokémon seleccionado
  private esMachoSubject = new BehaviorSubject<boolean>(true); // true = macho, false = hembra
  private esShinySubject = new BehaviorSubject<boolean>(false); // true = shiny, false = no shiny
  esMacho$ = this.esMachoSubject.asObservable();
  esShiny$ = this.esShinySubject.asObservable();
  clave: string | null = ""
  usuario: Usuario = {
    id: "",
    Email: "",
    Username: "",
    Password: "",
    UrlImagenPerfil: '',
    CombatesGanados: 0,
    box: [],
    ListaFavoritos: [],
    ListaEquipos: [],
    ListaObjetos: []
  }
  // Este observable combinará los valores de selectedPokemon$, esMacho$ y esShiny$ para generar la URL correcta del sprite.
  spriteActual$: Observable<string | null> = combineLatest([
    this.selectedPokemon$,
    this.esMacho$,
    this.esShiny$
  ]).pipe(
    map(([pokemon, esMacho, esShiny]) => {
      if (!pokemon) return null; // Si no hay un Pokémon seleccionado, devuelve null
      // Elige el sprite de acuerdo a las propiedades esMacho y esShiny
      if (esMacho && esShiny) return pokemon.sprites.front_shiny;
      if (esMacho && !esShiny) return pokemon.sprites.front_default;
      if (!esMacho && esShiny) return pokemon.sprites.front_shiny_female;
      if (!esMacho && !esShiny) return pokemon.sprites.front_female;
      return null;
    })
  );
  urlBase: string = 'https://pokeapi.co/api/v2';
  private favoritosSubject = new BehaviorSubject<Pokemon[]>([]);
  favoritos$ = this.favoritosSubject.asObservable();

  constructor(private http: HttpClient) {
    // Inicializar las cajas para evitar errores
    this.usuario.box = Array.from({ length: this.TOTAL_CAJAS }, (_, index) => ({
      imagen: `/assets/imagenes/cajas/${index + 1}.png`,
      pokemones: [],
    }));
    this.cajasSubject.next(this.usuario.box); // Emitir cajas inicializadas
  }

  public limpiarCaja() {
    this.cajas.forEach(caja => caja.pokemones = []);

    // Volver a emitir el array actualizado
    this.cajasSubject.next([...this.cajas]);
    console.log("a ver si borre:", this.cajasSubject)


  }

  getid() {
    this.clave = localStorage.getItem('token')
  }

  getPokemonByName(nombrePokemon: string): Observable<Pokemon | undefined> {
    return this.http.get<any>(`${this.urlBase}/pokemon/${nombrePokemon}`).pipe(
      map((data) => ({
        id: data.id,
        name: data.name,
        sprites: {
          back_default: data.sprites.back_default,
          back_female: data.sprites.back_female,
          back_shiny: data.sprites.back_shiny,
          back_shiny_female: data.sprites.back_shiny_female,
          front_default: data.sprites.front_default,
          front_female: data.sprites.front_female,
          front_shiny: data.sprites.front_shiny,
          front_shiny_female: data.sprites.front_shiny_female
        } as Sprites,
        types: data.types.map((typeData: any) => ({
          type: typeData.type
        })) as Type[],
      })),
      catchError((error) => {
        console.error('Error fetching Pokémon:', error);
        return of(undefined);
      })
    );
  }

  getPokemonByGeneration(NumeroGeneracion: number): Observable<Generation | undefined> {
    return this.http.get<Generation>(`${this.urlBase}/${"generation"}/${NumeroGeneracion.toString()}`).pipe(
      catchError(() => {
        return of(undefined)
      })
    );
  }

  setSelectedPokemon(pokemon: Pokemon): void {
    this.selectedPokemonSubject.next(pokemon);
    const esMacho = pokemon.isMale ?? true; // Valor predeterminado si no está definido
    const esShiny = pokemon.isShiny ?? false;
    this.esMachoSubject.next(esMacho);
    this.esShinySubject.next(esShiny);
  }

  getSelectedPokemon(): Pokemon | null {
    return this.selectedPokemonSubject.value; // Obtener el valor actual
  }

  setEsMacho(esMacho: boolean): void {
    const pokemon = this.getSelectedPokemon();
    if (!pokemon) return;

    // Verifica si el Pokémon tiene sprite femenino. Si no, manténlo como macho.
    if (!esMacho && !pokemon.sprites.front_female) {
      console.warn('Este Pokémon no tiene sprite femenino. Se mantendrá como macho.');
      this.esMachoSubject.next(true); // Mantener como macho si no hay sprite femenino
    } else {
      this.esMachoSubject.next(esMacho); // Cambiar a hembra solo si tiene sprite
    }
  }

  setEsShiny(esShiny: boolean): void {
    this.esShinySubject.next(esShiny);
  }

  getSprite(pokemon: Pokemon | null): string {
    if (!pokemon) return ''; // Manejo de caso nulo

    const esMacho = this.esMachoSubject.value;
    const esShiny = this.esShinySubject.value;
    if (esMacho && esShiny) {
      return pokemon.sprites.front_shiny;
    } else if (!esMacho && esShiny) {
      if (pokemon.sprites.front_shiny_female) {
        return pokemon.sprites.front_shiny_female;
      }
      else {
        return pokemon.sprites.front_shiny;
      }
    } else if (!esMacho && !esShiny) {
      if (pokemon.sprites.front_female) {
        return pokemon.sprites.front_female;
      }
      else {
        return pokemon.sprites.front_default;
      }
    } else {
      return pokemon.sprites.front_default;
    }
  }

  getEsShiny(): boolean {
    return this.esShinySubject.value;
  }

  updatePokemonInCaja(updatedPokemon: Pokemon): void {
    if (!updatedPokemon) {
      console.error('Error: No se proporcionó un Pokémon para actualizar.');
      return;
    }

    if (!this.usuario?.box?.length) {
      console.warn('Advertencia: No hay cajas inicializadas.');
      return;
    }

    for (let caja of this.usuario.box) {
      const pokemonIndex = caja.pokemones.findIndex(p => p.id === updatedPokemon.id);
      if (pokemonIndex !== -1) {
        // Actualiza el Pokémon con las propiedades modificadas
        caja.pokemones[pokemonIndex] = {
          ...caja.pokemones[pokemonIndex],
          isMale: this.esMachoSubject.value,
          isShiny: this.esShinySubject.value,
        };
        // Emitir actualización
        this.cajasSubject.next([...this.usuario.box]);
        break;
      }
    }

    // Guardar cambios en el backend si la clave está definida
    if (this.clave) {
      this.usuarioService.putUsuario(this.usuario, this.clave).subscribe({
        next: () => console.log('Usuario guardado con éxito.'),
        error: (e: Error) => console.error('Error al guardar el usuario:', e.message),
      });
    }
  }

  //generar un equipo random
  getRandomPokemonTeam(): Observable<Pokemon[]> {
    const pokemonRequests: Observable<Pokemon | null>[] = [];
    // Generar 6 IDs aleatorios de Pokémon entre 1 y 1025
    for (let i = 0; i < 6; i++) {
      const randomId = Math.floor(Math.random() * 1025) + 1;
      pokemonRequests.push(
        this.http.get<Pokemon>(`${this.urlBase}/pokemon/${randomId}`).pipe(
          catchError(() => of(null)) // Emitir `null` si ocurre un error, sin conversión de tipo
        )
      );
    }

    // Combinar todas las peticiones y filtrar resultados `null`
    return forkJoin(pokemonRequests).pipe(
      map(results => results.filter((pokemon): pokemon is Pokemon => pokemon !== null))
    );
  }

  public vaciarFavoritos() {
    this.favoritosSubject.next([]);

  }
  public setFavoritos(pokemons: Pokemon[]) {
    this.favoritosSubject.next(pokemons);
  }

  agregarAFavoritos(pokemon: Pokemon) {
    const favoritosActuales = this.favoritosSubject.value;
    // Limite de 6
    if (favoritosActuales.length >= 6) {
      alert('Solo puedes tener 6 Pokémon en favoritos.');
      return;
    }

    // Evitar duplicados por ID
    if (favoritosActuales.find(p => p.id === pokemon.id)) {
      alert('Este Pokémon ya está en favoritos.');
      return;
    }

    const clon = this.clonarPokemon(pokemon);
    this.favoritosSubject.next([...favoritosActuales, clon]);
    this.getid()
    this.usuarioService.getUsuarioById(this.clave).subscribe({
      next: (valor: Usuario) => {
        this.usuario = valor
        this.usuario.ListaFavoritos = this.favoritosSubject.value
        this.usuario.ListaEquipos = [...valor.ListaEquipos]
        this.usuarioService.putUsuario(this.usuario, this.clave).subscribe({
          next: () => console.log('favoritos actualizado con éxito.'),
          error: (e: Error) => console.error('Error al guardar el usuario:', e.message),
        });
      },
      error: (e: Error) => console.error('Error al obtener el usuario para actualizar su lista de favoritos:', e.message),
    });
  }

  eliminarFavorito(pokemonId: number): void {
    const actuales = this.favoritosSubject.value;
    const nuevos = actuales.filter(p => p.id !== pokemonId);
    this.favoritosSubject.next(nuevos);
    this.getid()
    this.usuarioService.getUsuarioById(this.clave).subscribe({
      next: (valor: Usuario) => {
        this.usuario = valor
        this.usuario.ListaFavoritos = this.favoritosSubject.value
        this.usuario.ListaEquipos = [...valor.ListaEquipos]
        this.usuarioService.putUsuario(this.usuario, this.clave).subscribe({
          next: () => console.log('favorito eliminado con éxito.'),
          error: (e: Error) => console.error('Error al actualizar el favorito:', e.message),
        });
      },
      error: (e: Error) => console.error('Error al obtener el usuario para borrar un pokemon de su lista de favoritos:', e.message),
    });
  }

  clonarPokemon(pokemon: Pokemon): Pokemon {
    return {
      ...pokemon,
      isShiny: pokemon.isShiny ?? false,
      isMale: pokemon.isMale ?? true,
    };
  }

  getEsMachoActual(): boolean {
    return this.esMachoSubject.value;
  }

  getEsShinyActual(): boolean {
    return this.esShinySubject.value;
  }

}
