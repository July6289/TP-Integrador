import { Location } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { CajaService } from '../../pokeservices/caja.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { CajaComponent } from '../../componentesPokemon/caja/caja.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,],
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
    Password: "",
    CombatesGanados:0,
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

    this.usuarioService.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Username = valor.Username;
          this.usuario.Password = valor.Password
          this.usuario.id = valor.id
          this.usuario.CombatesGanados=valor.CombatesGanados;
          for (let i = 0; i < valor.box.length; i++) {
            this.usuario.box[i] = valor.box[i]
          }
          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco

          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion++;
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

      this.auth.logOut()//para el guard
      this.auth.logLogout() //para firebase
      this.textButton = 'Iniciar Sesion'
      this.Router.navigateByUrl('registro');
      localStorage.clear();
    }
  }

  llamarDbGuardarDatos(): void {

    this.cajaService.dbGuardarDatos(this.usuario, this.secretId || '');
  }
}
