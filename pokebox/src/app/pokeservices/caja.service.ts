import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../interfaces/interfaz-usuario/interfazGeneracion.interface';


@Injectable({
  providedIn: 'root', // Proveer en la raíz
})

export class CajaService {
  constructor(private usuarioService: UsuarioService) { }

  dbGuardarDatos(usuario: Usuario, secretId: string | null): void {
    if (usuario.Password !== '') {
      this.usuarioService.putUsuario(usuario, secretId).subscribe({
        next: () => {
          console.log('Usuario Guardado');
        },
        error: (e: Error) => {
          console.error(e.message);
        },
      });
    }
  }
}
