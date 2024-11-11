import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }
  urlbase:string='http://localhost:3000/Usuarios';
  service=inject(HttpClient);

  postUsuario(usuario:Usuario):Observable<Usuario>{
    return this.service.post<Usuario>(this.urlbase,usuario);
   }
   getCharacters():Observable<Usuario[]>{
    return this.service.get<Usuario[]>(this.urlbase)
   }
   getUsuariobyName(name: string): Observable<Usuario[]> {
    return this.service.get<Usuario[]>(`${this.urlbase}?Username=${name}`);
  }
}
