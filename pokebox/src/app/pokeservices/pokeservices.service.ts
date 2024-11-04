import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Generation } from '../interfaces/interfazpokemon/interfazGeneracion.interface';
import { Pokemon } from '../interfaces/interfazpokemon/interfazpokemon.inteface';

@Injectable({
  providedIn: 'root'
})
export class PokeservicesService {
  private selectedPokemonSubject = new BehaviorSubject<Pokemon | null>(null); // BehaviorSubject para el Pokémon seleccionado
  selectedPokemon$ = this.selectedPokemonSubject.asObservable(); // Observable para suscribirse a los cambios

  // Nueva propiedad para mantener el sprite actual del Pokémon seleccionado
  private spriteActualSubject = new BehaviorSubject<string | null>(null);
  spriteActual$ = this.spriteActualSubject.asObservable()

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
    this.setSpriteActual(pokemon.sprites.front_default); // Inicialmente el sprite normal
  }

  getSelectedPokemon(): Pokemon | null {
    return this.selectedPokemonSubject.value; // Obtener el valor actual
  }

  // Método para actualizar el sprite actual
  setSpriteActual(spriteUrl: string): void {
    this.spriteActualSubject.next(spriteUrl);
  }
}
