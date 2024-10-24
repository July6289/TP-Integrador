import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
@Injectable({
providedIn: 'root'

})

export class PokeservicesComponent {
constructor(private http: HttpClient){
url: string:'https://pokeapi.co/api/v2/';

}
}
