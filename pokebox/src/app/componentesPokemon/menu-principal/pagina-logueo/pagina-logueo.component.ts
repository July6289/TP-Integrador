import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Caja } from '../../../interfaces/interfaz-caja/interfazCaja.inteface';
import { UsuarioService } from '../../../pokeservices/usuario.service';
import { Usuario } from '../../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { PokeservicesService } from '../../../pokeservices/pokeservices.service';

@Component({
  selector: 'app-pagina-logueo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,],
  templateUrl: './pagina-logueo.component.html',
  styleUrl: './pagina-logueo.component.css'
})
export class PaginaLogueoComponent {

  constructor(private ctrl: ChangeDetectorRef) { }
  validadorMensajeEspecifico: boolean = false;
  mensajeEspecifico: string = '';
  isLoggingButtonShowing: boolean = true;
  isRegisterButtonShowing: boolean = true;
  isFormLoginShowing: boolean = false;
  IsFormRegisterShowing: boolean = false;

  usuarioService = inject(UsuarioService);
  pokeservice = inject(PokeservicesService);
  router = inject(Router);
  fb = inject(FormBuilder)

  formulario = this.fb.nonNullable.group(
    {
      box: [[] as Caja[]], //un array vacio de cajas
      Username: ['', [Validators.required, Validators.minLength(6)]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    }
  )


  btRegistro() {
    this.isRegisterButtonShowing = false;
    this.IsFormRegisterShowing = true;
    this.isLoggingButtonShowing = false;


  }
  btLogueo() {
    this.validadorMensajeEspecifico = false;

    this.isRegisterButtonShowing = false;
    this.isFormLoginShowing = true;
    this.isLoggingButtonShowing = false;

  }
  btVolver() {
    this.formulario.reset();
    this.isRegisterButtonShowing = true;
    this.IsFormRegisterShowing = false;
    this.isFormLoginShowing = false;
    this.isLoggingButtonShowing = true;
    this.validadorMensajeEspecifico = false;
    this.mensajeEspecifico = '';

  }
  addUsuario() {
    if (this.formulario.invalid) {
      console.log("Error");
    }
    else {
      this.validadorMensajeEspecifico = true;
      const usuario = this.formulario.getRawValue();
      usuario.box = this.pokeservice.getNewCaja();
      this.usuarioService.getUsuariobyName(usuario.Username).subscribe(
        {
          next: (usuarioDato: Usuario[]) => {
            if (usuarioDato.length > 0) {
              this.mensajeEspecifico = 'Este usuario ya existe en el sistema';
              this.validadorMensajeEspecifico = true;

              console.log(this.validadorMensajeEspecifico);
              console.log(this.mensajeEspecifico);
              this.ctrl.detectChanges();
            }
            else {
              this.usuarioService.postUsuario(usuario).subscribe(
                {
                  next: () => {
                    console.log("enviado con exito");
                    this.isRegisterButtonShowing = true;
                    this.IsFormRegisterShowing = false;
                    this.isLoggingButtonShowing = true;
                    this.formulario.reset();
                  },
                  error: (e: Error) => {
                    console.log(e.message);
                    this.formulario.reset();
                  }
                }
              )
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

    if (this.formulario.invalid) {
      console.log("Error");
    }
    else {
      const datosUsuario = this.formulario.getRawValue();

      this.usuarioService.getUsuariobyName(datosUsuario.Username).subscribe(
        {
          next: (usuario: Usuario[]) => {
            if (usuario.length > 0) {
              console.log('Usuario encontrado:', usuario[0]);
              if (usuario[0].Password.localeCompare(datosUsuario.Password) === 0) {
                console.log(usuario[0]);
                console.log(datosUsuario.Password);
                this.router.navigate([`main-page/${usuario[0].id}`]);
              }
              else {
                this.validadorMensajeEspecifico = true;
                this.mensajeEspecifico = 'contraseña incorrecta, ingese nuevamente';
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
