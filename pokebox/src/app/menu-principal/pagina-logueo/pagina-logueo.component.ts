import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterEvent, RouterLinkActive, RouterModule } from '@angular/router';
import { Caja } from '../../interfaces/interfaz-caja/interfazCaja.inteface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';

@Component({
  selector: 'app-pagina-logueo',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,],
  templateUrl: './pagina-logueo.component.html',
  styleUrl: './pagina-logueo.component.css'
})
export class PaginaLogueoComponent {

  validadorMensajeEspecifico:boolean=false;
  mensajeEspecifico:string='';
  isLoggingButtonShowing:boolean=true;
  isRegisterButtonShowing:boolean=true;
  isFormLoginShowing:boolean=false;
  IsFormRegisterShowing:boolean=false;

  usuarioService=inject(UsuarioService);

  fb=inject(FormBuilder)

  formulario=this.fb.nonNullable.group(
    {
        box:[[] as Caja[]], //un array vacio de cajas
        Username:['',[Validators.required,Validators.minLength(6)]],
        Password:['',[Validators.required,Validators.minLength(6)]]



    }
  )


  btRegistro()
  {
    this.isRegisterButtonShowing=false;
    this.IsFormRegisterShowing=true;
    this.isLoggingButtonShowing=false;


  }
  btLogueo()
  {
    this.validadorMensajeEspecifico=false;

    this.isRegisterButtonShowing=false;
    this.isFormLoginShowing=true;
    this.isLoggingButtonShowing=false;

  }
  btVolver()
  {
    this.formulario.reset();
    this.isRegisterButtonShowing=true;
    this.IsFormRegisterShowing=false;
    this.isFormLoginShowing=false;
    this.isLoggingButtonShowing=true;

  }
addUsuario()
{
  if(this.formulario.invalid)
  {
    console.log("Error");
  }
  else{
  const usuario=this.formulario.getRawValue();
  this.usuarioService.postUsuario(usuario).subscribe(
    {
      next:()=>{
        console.log("enviado con exito");
        this.isRegisterButtonShowing=true;
        this.IsFormRegisterShowing=false;
        this.isLoggingButtonShowing=true;
        this.formulario.reset();
      },
      error:(e:Error)=>{
        console.log(e.message);
        this.formulario.reset();

      }

    }

  )
  console.log(usuario);

  }
}
checkLoggedUsuario()
{

  if(this.formulario.invalid)
  {
    console.log("Error");

  }
  else
  {
    const datosUsuario=this.formulario.getRawValue();

    this.usuarioService.getUsuariobyName(datosUsuario.Username).subscribe(
      {
        next:(usuario:Usuario[])=>{
          if (usuario.length > 0) {
            console.log('Usuario encontrado:', usuario[0]);
          } else {
            console.log('Usuario no encontrado');
          }
        },
        error:(e:Error)=>{
          console.log(e.message);
          this.validadorMensajeEspecifico=true;
          this.mensajeEspecifico="el usuario ingresado no existe";
          this.formulario.reset();
        }

      }

    )


  }



}
}
