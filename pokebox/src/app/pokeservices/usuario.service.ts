import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private service: HttpClient) { }
  urlbase: string = 'http://localhost:3000/Usuarios';
  estoyLogeado:boolean=false

  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.service.post<Usuario>(this.urlbase, usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.service.get<Usuario[]>(this.urlbase)
  }

  getUsuarioById(id: string | null): Observable<Usuario> {
    return this.service.get<Usuario>(`${this.urlbase}/${id}`);
  }

  getUsuariobyName(name: string): Observable<Usuario[]> {
    return this.service.get<Usuario[]>(`${this.urlbase}?Username=${name}`);
  }

  putUsuario(usuario: Usuario, id: string|null): Observable<Usuario> {
    if (!id) {
      console.error('Error: El ID del usuario no está definido.');
      return throwError(() => new Error('El ID del usuario no está definido.'));
    }
    return this.service.patch<Usuario>(`${this.urlbase}/${id}`, usuario);
  }


}
