import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { CajaService } from '../../pokeservices/caja.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  textButton: string = 'Iniciar Sesion'
  perfilActivo: boolean = false;
  auth = inject(AuthService);
  localizador = inject(Location);
  Router = inject(Router);
  cajaService = inject(CajaService);
  usuarioService = inject(UsuarioService)
  posicion: number = 0;

  usuario: Usuario = {
    id: "",
    box: [],
    Username: "",
    Password: ""
  }

  secretId: string | null = ""

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.textButton = 'Cerrar Sesion'
      this.perfilActivo = true;
      this.dbUsuarioId();
    }


  }

  dbUsuarioId() {
    this.secretId = this.auth.getTokenValue();

    console.log(localStorage.getItem('token'));

    this.usuarioService.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.posicion=0;
          this.usuario.Username = valor.Username;
          this.usuario.Password = valor.Password
          this.usuario.id = valor.id

          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco

          valor.box.map((caja) => {

            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion = this.posicion + 1;
          })
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

  goToPerfil() {
    this.Router.navigate(['/perfil']);
  }

  onLonginLogout() {
    if (this.textButton === 'Iniciar Sesion') {
      this.textButton = 'Cerrar Sesion'
      this.auth.logIn()
      this.Router.navigateByUrl('registro');
    } else {

      this.auth.logOut()
      this.textButton = 'Iniciar Sesion'
      this.Router.navigateByUrl('registro');
      localStorage.clear();
    }
  }

  llamarDbGuardarDatos(): void {
    if (this.secretId === null) {
      this.secretId = ""
    }

    this.cajaService.dbGuardarDatos(this.usuario, this.secretId);
  }
}
