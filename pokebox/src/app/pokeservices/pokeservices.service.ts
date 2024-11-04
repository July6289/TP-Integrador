import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of } from 'rxjs';
import { Generation } from '../interfaces/interfazpokemon/interfazGeneracion.interface';
import { Pokemon } from '../interfaces/interfazpokemon/interfazpokemon.inteface';

@Injectable({
  providedIn: 'root'
})

export class PokeservicesService {
  private selectedPokemonSubject = new BehaviorSubject<Pokemon | null>(null); // BehaviorSubject para el Pokémon seleccionado
  selectedPokemon$ = this.selectedPokemonSubject.asObservable(); // Observable para suscribirse a los cambios

  // Nueva propiedad para mantener el sprite actual del Pokémon seleccionado
  private esMachoSubject = new BehaviorSubject<boolean>(true); // true = macho, false = hembra
  private esShinySubject = new BehaviorSubject<boolean>(false); // true = shiny, false = no shiny

  esMacho$ = this.esMachoSubject.asObservable();
  esShiny$ = this.esShinySubject.asObservable();

  // Este observable combinará los valores de selectedPokemon$, esMacho$ y esShiny$
  // para generar la URL correcta del sprite.
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

  constructor(private http: HttpClient) { }

  urlBase: string = 'https://pokeapi.co/api/v2';

  getPokemonByName(nombrePokemon: string): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`${this.urlBase}/${'pokemon'}/${nombrePokemon}`).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      })
    )
  }

  getPokemonByGeneration(NumeroGeneracion: number): Observable<Generation | undefined> {
    console.log("el dato es", NumeroGeneracion);
    return this.http.get<Generation>(`${this.urlBase}/${"generation"}/${NumeroGeneracion.toString()}`).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      })
    );
  }

  setSelectedPokemon(pokemon: Pokemon): void {
    this.selectedPokemonSubject.next(pokemon); // Emitir el Pokémon seleccionado
    // Reiniciar los valores al seleccionar un nuevo Pokémon
    this.esMachoSubject.next(true); // Por defecto "macho"
    this.esShinySubject.next(false); // Por defecto no "shiny"
  }

  getSelectedPokemon(): Pokemon | null {
    return this.selectedPokemonSubject.value; // Obtener el valor actual
  }

  setEsMacho(esMacho: boolean): void {
    this.esMachoSubject.next(esMacho);
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
      return pokemon.sprites.front_shiny_female;
    } else if (!esMacho && !esShiny) {
      return pokemon.sprites.front_female;
    } else {
      return pokemon.sprites.front_default;
    }
  }

  getEsShiny(): boolean {
  return this.esShinySubject.value;
}
}
