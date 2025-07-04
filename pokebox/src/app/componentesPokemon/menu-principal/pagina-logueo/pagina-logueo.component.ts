import { Usuario } from '../../../interfaces/interfaz-usuario/Usuario.interface';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Caja } from '../../../interfaces/interfaz-caja/Caja.inteface';
import { UsuarioService } from '../../../pokeservices/usuario.service';
import { PokeservicesService } from '../../../pokeservices/pokemon.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Pokemon } from '../../../interfaces/interfazpokemon/Pokemon.inteface';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { EquipoPokemon } from '../../../interfaces/interfazpokemon/Equipo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-logueo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './pagina-logueo.component.html',
  styleUrl: './pagina-logueo.component.css'
})

export class PaginaLogueoComponent {
  constructor(private ctrl: ChangeDetectorRef, private auth: AuthService) { }
  validadorMensajeEspecifico: boolean = false;
  visible: boolean = true;
  changetype: boolean = true;
  mensajeEspecifico: string = '';
  isFormLoginShowing: boolean = true;
  IsFormRegisterShowing: boolean = false;
  isFormForgotPasswordShowing: boolean = false;
  idUsuario: string = "";
  usuarioService = inject(UsuarioService);
  authservice = inject(AuthService);
  pokeservice = inject(PokeservicesService);
  router = inject(Router);
  fb = inject(FormBuilder);
  usuarioNuevo: Usuario = {
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
  formularioRegistro = this.fb.nonNullable.group(
    {
      id: [''],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', [Validators.required, Validators.minLength(4)]],
      Password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)]],
      UrlImagenPerfil: [''],
      CombatesGanados: 0,
      box: [[] as Caja[]], //un array vacio de cajas
      ListaFavoritos: [[] as Pokemon[],],
      ListaEquipos: [[] as EquipoPokemon[],],
      ListaObjetos: [[] as Objeto[],]
    }
  )
  formularioLogueo=this.fb.nonNullable.group(
    {
       id: [''],
      Email: ['', [Validators.required, Validators.email]],
      Username: [''],
      Password: ['', [Validators.required]],
      UrlImagenPerfil: [''],
      CombatesGanados: 0,
      box: [[] as Caja[]], //un array vacio de cajas
      ListaFavoritos: [[] as Pokemon[],],
      ListaEquipos: [[] as EquipoPokemon[],],
      ListaObjetos: [[] as Objeto[],]
    }
  )
  formularioOlvideContrasenia = this.fb.nonNullable.group(
    {
      Email: ['', [Validators.required, Validators.email]]
    }
  )

  viewpass() {
    this.visible = !this.visible
    this.changetype = !this.changetype
  }

  btRegistro() {
    this.formularioRegistro.reset();
    this.formularioLogueo.reset()
    this.validadorMensajeEspecifico = false;
    this.IsFormRegisterShowing = true;
    this.isFormLoginShowing = false;
    this.mensajeEspecifico = '';
  }

  btLogueo() {
    this.formularioRegistro.reset()
    this.formularioLogueo.reset()
    this.formularioOlvideContrasenia.reset()
    this.validadorMensajeEspecifico = false;
    this.IsFormRegisterShowing = false;
    this.isFormLoginShowing = true;
    this.mensajeEspecifico = '';
  }

  btVolver() {
    this.formularioRegistro.reset();
    this.formularioLogueo.reset()
    this.IsFormRegisterShowing = false;
    this.isFormLoginShowing = true;
    this.validadorMensajeEspecifico = false;
    this.isFormForgotPasswordShowing = false;
    this.mensajeEspecifico = '';
  }

  btOlvideContrasenia() {
    this.formularioOlvideContrasenia.reset()
    this.formularioLogueo.reset()
    this.isFormForgotPasswordShowing = true;
    this.isFormLoginShowing = false;
  }

  btEnviarGmail() {
    const usuarioDato = this.formularioOlvideContrasenia.getRawValue();
    this.usuarioService.getUsuariobyName(usuarioDato.Email).subscribe(
      {
        next: (usuario: Usuario[]) => {
          if (usuario.length > 0 && usuario[0] != undefined) {
            if (usuario[0].Password == null)  //si la contrasenia es nulla,significa que estamos usando una de google, no podemos usar una de google
            {
              this.validadorMensajeEspecifico = true
              this.mensajeEspecifico = 'no se puede enviar un correo de recuperacion a una cuenta autenticada con google'
            }
            else {
              this.validadorMensajeEspecifico = true
              this.authservice.enviarCorreoRecuperación(usuarioDato.Email);
              this.mensajeEspecifico = "correo verificado, siga las instrucciones enviadas en su correo para recuperar la contraseña"
            }
          }
          else {
            this.validadorMensajeEspecifico = true
            this.mensajeEspecifico = 'el usuario no existe en el sistema'
          }
        }
      }
    )
  }

  onClickGoogle() {
    const result = this.authservice.logInGoogle();
    result.then(result => {
      const user = result.user;
      const email = user.email; // Extraer el correo del usuario
      const name = user.displayName
      if (email != null && name != null) {
        this.usuarioService.getUsuariobyName(email).subscribe(
          {
            next: (usuarioDato: Usuario[]) => {
              if (usuarioDato[0] == undefined) {  //nos da a entender que el usuario no existe
                this.idUsuario = getRandomAlphaNumeric(4);
                this.usuarioNuevo.id = this.idUsuario;
                this.usuarioNuevo.Email = email;
                this.usuarioNuevo.Username = name;
                this.usuarioNuevo.UrlImagenPerfil = '/assets/imagenes/imagen_pokemon1.png'
                this.usuarioNuevo.Password = null;
                this.usuarioService.postUsuario(this.usuarioNuevo).subscribe(
                  {
                    next: () => {
                      localStorage.setItem('token', this.idUsuario);
                      this.usuarioService.estoyLogeado = true
                      this.usuarioService.activarMensaje()
                      this.router.navigate([`main-page`])
                    },
                    error: (e: Error) => {
                      console.log(e.message);
                      this.formularioRegistro.reset();
                    }
                  }
                )
              }
              else {
                if (usuarioDato[0].id != undefined) {
                  localStorage.setItem('token', usuarioDato[0].id);
                  this.usuarioService.estoyLogeado = true
                  this.usuarioService.activarMensaje()
                  this.router.navigate([`main-page`])
                }
              }
            }
          })
      }
    })
      .catch(error => {
        console.error("Error al iniciar sesión con Google:", error);
      });
  }

  addUsuario() {
    if (this.formularioRegistro.invalid) {
      console.log("Error");
    }
    else {
      this.validadorMensajeEspecifico = true;
      const usuario = this.formularioRegistro.getRawValue();
      usuario.box = this.pokeservice.cajas;
      usuario.UrlImagenPerfil = '/assets/imagenes/imagen_pokemon1.png'
      this.usuarioService.getUsuariobyName(usuario.Email).subscribe(
        {
          next: (usuarioDato: Usuario[]) => {
            if (usuarioDato.length > 0 && usuarioDato[0] != undefined) {
              this.mensajeEspecifico = 'Este usuario ya existe en el sistema';
              this.validadorMensajeEspecifico = true;
              this.ctrl.detectChanges();
            }
            else {
              this.auth.register(usuario as Usuario)
                .then(() => {
                  usuario.id = getRandomAlphaNumeric(4);
                  this.usuarioService.postUsuario(usuario).subscribe(
                    {
                      next: () => {
                        localStorage.setItem('token', usuario.id);
                        this.authservice.logIn2(usuario);
                        this.usuarioService.estoyLogeado = true
                        this.usuarioService.activarMensaje()
                        this.router.navigate([`main-page`])
                      },
                      error: (e: Error) => {
                        console.log(e.message);
                        this.formularioRegistro.reset();
                      }
                    }
                  )
                })
                .catch((error) => {
                  // Manejar el error devuelto
                  if (error.code === "auth/invalid-email") {
                    this.validadorMensajeEspecifico = true;
                    this.mensajeEspecifico = 'El correo no tiene un formato válido.';
                  } else if (error.code === "auth/email-already-in-use") {
                    this.validadorMensajeEspecifico = true;
                    this.mensajeEspecifico = 'El correo ya está registrado.';
                  } else {
                    this.validadorMensajeEspecifico = true;
                    this.mensajeEspecifico = 'Error desconocido: ', error.messaje;
                  }
                });
            }
          },
          error: (e: Error) => {
            console.log(e.message);
          }
        }
      )
    }
  }

  checkLoggedUsuario() {
    this.validadorMensajeEspecifico = false;
    this.mensajeEspecifico = '';
    const datosUsuario = this.formularioLogueo.getRawValue();

    if (this.formularioLogueo.invalid) {
      console.log("Error");
    }
    else {
      this.usuarioService.getUsuariobyName(datosUsuario.Email).subscribe(
        {
          next: (usuario: Usuario[]) => {
            if (usuario.length != 0) {
              if (usuario[0].Password != null)  //si la contrasenia es nulla,significa que estamos usando una de google, no podemos usar una de google
              {
                if (usuario[0].Password.localeCompare(datosUsuario.Password) === 0) {

                  if (usuario[0].id !== undefined) {
                    localStorage.setItem('token', usuario[0].id);
                    this.authservice.logIn2(datosUsuario);
                    this.usuarioService.estoyLogeado = true
                    this.usuarioService.activarMensaje()
                    this.router.navigate([`main-page`])
                  }
                }
                else {
                  this.validadorMensajeEspecifico = true;
                  this.mensajeEspecifico = 'contraseña incorrecta, ingrese nuevamente';
                }
              }
              else {
                this.validadorMensajeEspecifico = true;
                this.mensajeEspecifico = 'usuario autenticado con google, no tiene contraseña propia';
              }
            }
            else {
              this.validadorMensajeEspecifico = true;
              this.mensajeEspecifico = 'el usuario ingresado no existe';
            }
          },
          error: (e: Error) => {
            console.log(e.message);
            this.formularioLogueo.reset();
          }
        }
      )
    }
  }
}

function getRandomAlphaNumeric(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}
