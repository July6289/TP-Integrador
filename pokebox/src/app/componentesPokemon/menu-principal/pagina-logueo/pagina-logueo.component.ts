import { Usuario } from './../../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Caja } from '../../../interfaces/interfaz-caja/interfazCaja.inteface';
import { UsuarioService } from '../../../pokeservices/usuario.service';
import { PokeservicesService } from '../../../pokeservices/pokeservices.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Pokemon } from '../../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { EquipoPokemon } from '../../../interfaces/interfazpokemon/interfazEquipo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-logueo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './pagina-logueo.component.html',
  styleUrl: './pagina-logueo.component.css'
})

export class PaginaLogueoComponent {
  constructor(private ctrl: ChangeDetectorRef, private auth: AuthService) { }
  validadorMensajeEspecifico: boolean = false;
  visible:boolean=true;
  changetype:boolean=true;
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
    box: [],
    Email: "",
    Username:"",
    Password: "",
    UrlImagenPerfil:'',
    CombatesGanados: 0,
    ListaFavoritos: [],
    ListaObjetos: [],
    ListaEquipos: []
  }
  formulario = this.fb.nonNullable.group(
    {
      id: [''],
      box: [[] as Caja[]], //un array vacio de cajas
      Email: ['', [Validators.required, Validators.minLength(6)]],
      Username:['',[Validators.required,Validators.minLength(6)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      UrlImagenPerfil:[''],
      CombatesGanados: 0,
      ListaFavoritos: [[] as Pokemon[],],
      ListaObjetos: [[] as Objeto[],],
      ListaEquipos: [[] as EquipoPokemon[],]
    }
  )

  viewpass(){
    this.visible=!this.visible
    this.changetype=!this.changetype
  }


  btRegistro() {
    this.formulario.reset();
    this.validadorMensajeEspecifico=false;
    this.IsFormRegisterShowing = true;
    this.isFormLoginShowing = false;
    this.mensajeEspecifico = '';

  }

  btLogueo() {
    this.validadorMensajeEspecifico = false;
    this.IsFormRegisterShowing = false;
    this.isFormLoginShowing = true;
    this.mensajeEspecifico = '';

  }

  btVolver() {
    this.formulario.reset();
    this.IsFormRegisterShowing = false;
    this.isFormLoginShowing = true;
    this.validadorMensajeEspecifico = false;
    this.isFormForgotPasswordShowing = false;
    this.mensajeEspecifico = '';
  }

  btOlvideContrasenia() {
    this.isFormForgotPasswordShowing = true;
    this.isFormLoginShowing = false;
  }

  btEnviarGmail() {
    const usuarioDato = this.formulario.getRawValue();
    this.usuarioService.getUsuariobyName(usuarioDato.Email).subscribe(
      {
        next: (usuario: Usuario[]) => {
          if (usuario.length != 0) {
            if (usuario[0].Password == null)  //si la contrasenia es nulla,significa que estamos usando una de google, no podemos usar una de google
            {
              this.validadorMensajeEspecifico = true
              this.mensajeEspecifico = 'no se puede enviar un correo de recuperacion a una cuenta autenticada con google'
            }
            else {
              this.authservice.enviarCorreoRecuperación(usuarioDato.Email);
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
      const name= user.displayName
      console.log("Correo del usuario:", email);
      // Puedes guardar el email en tu JSON o manejarlo como prefieras
      if (email != null&&name!=null) {
        this.usuarioService.getUsuariobyName(email).subscribe(
          {
            next: (usuarioDato: Usuario[]) => {
              if (usuarioDato[0] == undefined) {  //nos da a entender que el usuario no existe
                this.idUsuario = getRandomAlphaNumeric(4);
                this.usuarioNuevo.id = this.idUsuario;
                this.usuarioNuevo.Email = email;
                this.usuarioNuevo.Username=name;
                this.usuarioNuevo.UrlImagenPerfil='/assets/imagenes/imagen_pokemon1.png'
                this.usuarioNuevo.Password = null;
                this.usuarioService.postUsuario(this.usuarioNuevo).subscribe(
                  {
                    next: () => {
                      console.log("usuario creado con exito");
                      localStorage.setItem('token', this.idUsuario);
                      this.usuarioService.estoyLogeado = true
                      this.usuarioService.activarMensaje()
                      this.router.navigate([`main-page`])
                    },
                    error: (e: Error) => {
                      console.log(e.message);
                      this.formulario.reset();
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
    if (this.formulario.invalid) {
      console.log("Error");
    }
    else {
      this.validadorMensajeEspecifico = true;
      const usuario = this.formulario.getRawValue();
      usuario.box = this.pokeservice.cajas;
      usuario.UrlImagenPerfil='/assets/imagenes/imagen_pokemon12.png'

      this.usuarioService.getUsuariobyName(usuario.Email).subscribe(
        {
          next: (usuarioDato: Usuario[]) => {
            if (usuarioDato.length > 0 && usuarioDato[0] != undefined) {
              this.mensajeEspecifico = 'Este usuario ya existe en el sistema';
              this.validadorMensajeEspecifico = true;
              console.log(usuarioDato[0]);
              console.log(this.validadorMensajeEspecifico);
              console.log(this.mensajeEspecifico);
              this.ctrl.detectChanges();
            }
            else {
              this.auth.register(usuario as Usuario)
                .then(() => {
                  this.idUsuario = getRandomAlphaNumeric(4);
                  usuario.id = this.idUsuario;
                  this.usuarioService.postUsuario(usuario).subscribe(
                    {
                      next: () => {
                        localStorage.setItem('token', this.idUsuario);
                        this.authservice.logIn2(usuario);
                        this.usuarioService.estoyLogeado = true
                        this.usuarioService.activarMensaje()
                        this.router.navigate([`main-page`])
                      },
                      error: (e: Error) => {
                        console.log(e.message);
                        this.formulario.reset();
                      }
                    }
                  )
                })
                .catch((error) => {
                  // Manejar el error devuelto
                  if (error.code === "auth/invalid-email") {
                    console.error("El correo no tiene un formato válido.");
                    this.validadorMensajeEspecifico = true;
                    this.mensajeEspecifico = 'correo electronico inexistente.';
                  } else if (error.code === "auth/email-already-in-use") {
                    console.error("El correo ya está registrado.");
                  } else {
                    console.error("Error desconocido:", error.message);
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
          const datosUsuario = this.formulario.getRawValue();
           this.formulario.patchValue({
      Username: "randomDATA",       //hacemos esto porque sino salta un error de datos por no llevar username el logueo
    })
    if (this.formulario.invalid) {
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
                  this.mensajeEspecifico = 'contraseña incorrecta, ingese nuevamente';
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
            this.formulario.reset();
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
