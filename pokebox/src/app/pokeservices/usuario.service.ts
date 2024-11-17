import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { Observable } from 'rxjs';
import { getLocaleMonthNames } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }
  urlbase: string = 'http://localhost:3000/Usuarios';
  service = inject(HttpClient);
  secretId: string = ""

  recibirId(id: string) {
    this.secretId = id
  }

  enviarId(){
    return this.secretId;
  }

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
  putUsuario(usuario: Usuario, id: string | null): Observable<Usuario> {
    return this.service.patch<Usuario>(`${this.urlbase}/${id}`, usuario)
  }
}
