import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { AuthService } from '../../auth/service/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { Usuario } from '../../interfaces/interfaz-usuario/Usuario.interface';

@Component({
  selector: 'app-recuperar-contra',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recuperar-contra.component.html',
  styleUrl: './recuperar-contra.component.css'
})

export class RecuperarContraComponent implements OnInit {
  message: string = '';
  email: string = '';
  isMessageShowing: boolean = false
  actionCode: string | null = null;
  usuarioDato: Usuario = {
    id: "",
    Email: "",
    Username: "",
    Password: "",
    UrlImagenPerfil: '',
    CombatesGanados: 0,
    box: [],
    ListaFavoritos: [],
    ListaEquipos: [],
    ListaObjetos: []
  }
  authService = inject(AuthService);
  auth = this.authService.getAuth();
  usuarioServicio = inject(UsuarioService);
  fb = inject(FormBuilder);
  guardarContraseña:string='';
  mostrarPassword: boolean = false;
  formularioContrasenia=this.fb.nonNullable.group({
    Password:['',[Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)]]
  }
  )
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.actionCode = this.route.snapshot.queryParamMap.get('oobCode');
    // Verificar si el código es válido
    if (this.actionCode) {
      verifyPasswordResetCode(this.auth, this.actionCode)
        .then(email => {
          this.email = email;
          this.message = `Código válido. Cambia la contraseña para: ${email}`;
          this.isMessageShowing = true;
        })
        .catch(error => {
          this.message = `Error: Código inválido o expirado.`;
          this.isMessageShowing = true;
          console.log(error);
        });
    } else {
      this.message = 'Enlace de verificación inválido.';
      this.isMessageShowing = true;
    }
  }

  onSubmit() {

    if (!this.actionCode) {
      this.message = 'Código inválido.';
      this.isMessageShowing = true;
      return;
    }
    const datosFormulario = this.formularioContrasenia.getRawValue();

    confirmPasswordReset(this.auth, this.actionCode, datosFormulario.Password)
      .then(() => {
        this.message = 'Contraseña cambiada exitosamente.';
        this.isMessageShowing = true;
        // Aquí actualizamos el backend
        this.usuarioServicio.getUsuariobyName(this.email).subscribe(
          {
            next: (usuarioDato: Usuario[]) => {
              if (usuarioDato.length > 0 && usuarioDato[0] != undefined) {
                this.usuarioDato = usuarioDato[0]
                this.usuarioDato.Email = this.email;
                this.usuarioDato.Password = datosFormulario.Password;
                this.usuarioServicio.putUsuario(this.usuarioDato, this.usuarioDato.id ?? null).subscribe(//verifica si es indefinido o null o tiene valor
                  {
                    next: () => {
                      console.log('Usuario Guardado');
                    },
                    error: (e: Error) => {
                      console.error(e.message);
                    },
                  }
                )
              }
            }
          })
      })
      .catch(error => {
        this.message = `Error al cambiar la contraseña: ${error.message}`;
        this.isMessageShowing = true;
      });
  }

  alternarVisibilidadPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

}
