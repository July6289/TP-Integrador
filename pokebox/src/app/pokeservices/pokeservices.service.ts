import { Pokemon } from '../interfazpokemon/interfazpokemon.inteface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Generation } from '../interfazpokemon/interfazGeneracion.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeservicesService {

  constructor(private http:HttpClient) { }

  urlBase: string='https://pokeapi.co/api/v2';
getPokemonByName(nombrePokemon:string):Observable<Pokemon|undefined>{
  return this.http.get<Pokemon>(`${this.urlBase}/${'pokemon'}/${nombrePokemon}`).pipe(
    catchError( (error)=>{
      console.log(error)
      return of(undefined)
    })

  )
}
getPokemonByGeneration(NumeroGeneracion:number):Observable<Generation|undefined>{
  console.log("el dato es",NumeroGeneracion);

  return this.http.get<Generation>(`${this.urlBase}/${"generation"}/${NumeroGeneracion.toString()}`).pipe(
    catchError((error)=>{
      console.log(error)
      return of(undefined)
    })
    );


}


}
