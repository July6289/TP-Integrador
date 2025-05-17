import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';

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
  pokeservice = inject(PokeservicesService)
  usuario: Usuario = {
    id: "",
    box: [],
    Email: "",
    Password: "",
    CombatesGanados: 0,
    ListaFavoritos: [],
    ListaObjetos: [],
    ListaEquipos: []
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
    setTimeout(() => {
      this.dbUsuarioId();
      console.log(this.usuario)
    }, 300);
  }

  dbUsuarioId() {
    this.usarioServicio.getUsuarioById(this.id).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;
          if (valor.Password === null) {
            this.isLoggedWithouthGoogle = false; // Tiene cuenta de Google
          }
          else {
            this.usuario.Password = valor.Password
            this.isLoggedWithouthGoogle = true;
          }

          this.usuario.id = valor.id
          this.usuario.CombatesGanados = valor.CombatesGanados;
          this.usuario.box = this.pokeservice.cajas
          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion = this.posicion + 1;
          })
          this.usuario.ListaFavoritos = [...valor.ListaFavoritos];
          this.usuario.ListaObjetos = [...valor.ListaObjetos];
          this.usuario.ListaEquipos = [...valor.ListaEquipos]
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

  confirmDelete() {
    this.authservice.BorrarUsuario();
    this.usuarioService.deleteUsuarioById(this.id).subscribe(
      {
        next: () => {
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
}
