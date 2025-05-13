import { Component, OnInit, TestabilityRegistry, inject } from '@angular/core';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'perfil',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  id: string | null = ""
  posicion: number = 0;
  isModifyShowing: boolean = false;
  validadorMensajeEspecifico: boolean = false;
  MensajeEspecifico: string = '';
  isCardShowing: boolean = true;
  isDeleteShowing: boolean = false;
  isLoggedWithouthGoogle: boolean = true;
  usarioServicio = inject(UsuarioService);
  usuario: Usuario = {
    id: "",
    box: [],
    Email: "",
    Password: "",
    CombatesGanados: 0,
    ListaFavoritos:[],
    ListaObjetos:[]
  }
  fb = inject(FormBuilder);

  authservice = inject(AuthService);
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  formulario = this.fb.nonNullable.group(
    {
      Email: ['', [Validators.required, Validators.minLength(6)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    }
  )
  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    this.dbUsuarioId();
  }

  dbUsuarioId() {
    this.usarioServicio.getUsuarioById(this.id).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;

          if (valor.Password===null) {
            this.isLoggedWithouthGoogle = false; // Tiene cuenta de Google

          }
          else {
            this.usuario.Password = valor.Password
            this.isLoggedWithouthGoogle = true;
          }

            console.log(this.isLoggedWithouthGoogle)

          this.usuario.id = valor.id
          this.usuario.CombatesGanados = valor.CombatesGanados;
          for (let i = 0; i < valor.box.length; i++) {
            this.usuario.box[i] = valor.box[i];
          }

          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion++;
          })

        this.usuario.ListaFavoritos=valor.ListaFavoritos
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }
  toggleModify() {
    this.isCardShowing = false;
    this.isModifyShowing = true;
  }
  toogleDelete() {
    this.isCardShowing = false;
    this.isDeleteShowing = true;
  }
  cancelDelete() {
    this.isCardShowing = true;
    this.isDeleteShowing = false;
  }
  cancelar() {
    this.isCardShowing = true;
    this.isModifyShowing = false;
  }
  confirmDelete() {
    this.authservice.BorrarUsuario();
    this.usuarioService.deleteUsuarioById(this.id).subscribe(
      {
        next: () => {
          console.log("usuario eliminado");
          this.authservice.logOut();
          localStorage.clear();
          this.router.navigate(['/registro']);
        },
        error: (e: Error) => {
          console.log(e);
        }
      }
    )
  }
  addUsuario() {
    if (this.formulario.invalid) {
      console.log("Error");
    }
    else {
      this.validadorMensajeEspecifico = true;
      const datosFormulario = this.formulario.getRawValue();
      this.usuarioService.getUsuariobyName(datosFormulario.Email).subscribe(
        {
          next: (usuarioDato: Usuario[]) => {
            if (usuarioDato.length > 0 && usuarioDato[0] != undefined) {
              this.MensajeEspecifico = 'Este usuario ya existe en el sistema';
              this.validadorMensajeEspecifico = true;
            }
            else {
              this.usuario.Email = datosFormulario.Email;
              this.usuario.Password = datosFormulario.Password;
              this.usuarioService.putUsuario(this.usuario, this.id).subscribe(
                {
                  next: () => {
                    console.log("enviado con exito");
                    this.isCardShowing = true;
                    this.isModifyShowing = false;
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
}
