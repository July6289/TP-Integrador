import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../interfazpokemon/interfazpokemon.component';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeservicesService {

  constructor(private http:HttpClient) { }

  urlBase: string='https://pokeapi.co/api/v2/pokemon/';
getPokemon(nombrePokemon:string):Observable<Pokemon|undefined>{
  return this.http.get<Pokemon>(`${this.urlBase}/${nombrePokemon}`).pipe(
    catchError( (error)=>{
      console.log(error)
      return of(undefined)
    })

  )

}
}
