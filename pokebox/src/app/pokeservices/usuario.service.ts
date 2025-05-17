import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  urlbase: string = 'http://localhost:3000/Usuarios';
  estoyLogeado: boolean = false

  constructor(private service: HttpClient) { }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.service.post<Usuario>(this.urlbase, usuario);
  }

  getUsuarioById(id: string | null): Observable<Usuario> {
    return this.service.get<Usuario>(`${this.urlbase}/${id}`);
  }

  getUsuariobyName(Email: string): Observable<Usuario[]> {
    return this.service.get<Usuario[]>(`${this.urlbase}?Email=${Email}`);
  }

  putUsuario(usuario: Usuario, id: string | null): Observable<Usuario> {
    if (!id) {
      console.error('Error: El ID del usuario no está definido.');
      return throwError(() => new Error('El ID del usuario no está definido.'));
    }

    return this.service.patch<Usuario>(`${this.urlbase}/${id}`, usuario);
  }

  deleteUsuarioById(id: string | null): Observable<void> {
    return this.service.delete<void>(`${this.urlbase}/${id}`);
  }
}
