import { Usuario } from './../../interfaces/interfaz-usuario/Usuario.interface';
import { AuthService } from './../../auth/service/auth.service';
import { UsuarioService } from './../../pokeservices/usuario.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { applyActionCode } from 'firebase/auth';

@Component({
  selector: 'app-usuario-verificado',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './usuario-verificado.component.html',
  styleUrl: './usuario-verificado.component.css'
})

export class UsuarioVerificadoComponent implements OnInit {
mensaje: string = 'Verificando...';
  oobCode: string | null = null;

  router = inject(Router);
  route = inject(ActivatedRoute);
  usuarioService = inject(UsuarioService);
  authservicio=inject(AuthService)
  ngOnInit() {
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode');
    const auth = this.authservicio.getAuth();

    if (this.oobCode) {
      applyActionCode(auth, this.oobCode)
        .then(() => {
          this.mensaje = '¡Correo verificado correctamente!';
          const usuarioJSON = localStorage.getItem('usuarioPendiente');

          if (usuarioJSON) {
            const usuario: Usuario = JSON.parse(usuarioJSON);

            this.usuarioService.getUsuarioById(usuario.id || '').subscribe({
              next: () => {

                this.mensaje='el usuario ya existe en el sistema'

              },
              error: () => {
                this.usuarioService.postUsuario(usuario).subscribe({
                  next: () => {
                    localStorage.removeItem('usuarioPendiente');
                  },
                  error: (e: Error) => {
                    console.error("Error al guardar el usuario:", e.message);
                    this.mensaje = 'Error al guardar el usuario.';
                  }
                });
              }
            });
          } else {
            this.mensaje = 'No se encontró información del usuario en espera.';
          }
        })
        .catch(() => {
          this.mensaje = 'El enlace es inválido o ha expirado.';
        });
    } else {
      this.mensaje = 'No se encontró el código de verificación.';
    }
  }
}



