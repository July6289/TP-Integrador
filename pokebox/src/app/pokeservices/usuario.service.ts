import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  urlbase: string = 'http://localhost:3000/Usuarios';
  estoyLogeado: boolean = false

  constructor(private service: HttpClient) { }


   private ActivadorMensajeSubject = new BehaviorSubject<boolean>(false);
    activadorMensaje$ = this.ActivadorMensajeSubject.asObservable();

    private ActualizarUrlPerfilSubject = new BehaviorSubject<string>("");
    actualizarperfil$ = this.ActualizarUrlPerfilSubject.asObservable();


public cambiarUrl(url:string)
{

  this.ActualizarUrlPerfilSubject.next(url)

}
  public activarMensaje()
  {
    this.ActivadorMensajeSubject.next(true)

  }
  public desactivarMensaje()
  {
    this.ActivadorMensajeSubject.next(false)

  }
  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.service.post<Usuario>(this.urlbase, usuario);
  }

  getUsuarioById(id: string | null): Observable<Usuario> {
    return this.service.get<Usuario>(`${this.urlbase}/${id}`);
  }

  getUsuariobyName(Email: string): Observable<Usuario[]> {
    return this.service.get<Usuario[]>(`${this.urlbase}?Email=${Email}`);
  }

  dbGuardarDatos(usuario: Usuario, secretId: string | null): void {
    if (usuario.Password !== '') {
      this.putUsuario(usuario, secretId).subscribe({
        next: () => {
          console.log('Usuario Guardado');
        },
        error: (e: Error) => {
          console.error(e.message);
        },
      });
    }
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
