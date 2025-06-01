import { Location } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { CajaService } from '../../pokeservices/caja.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { TutorialService } from '../../pokeservices/tutorial.service';
import { Observable, Subscription } from 'rxjs';

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
  mensajeActivo:boolean=false;
  auth = inject(AuthService);
  Router = inject(Router);
  cajaService = inject(CajaService);
  posicion: number = 0;
  usuario: Usuario = {
    id: "",
    box: [],
    Email: "",
    Username:"",
    Password: "",
    CombatesGanados: 0,
    ListaFavoritos: [],
    ListaObjetos: [],
    ListaEquipos: []
  }
  secretId: string | null = ""

 constructor(private usuarioService:UsuarioService ) {

  }

  ngOnInit(): void {
    this.usuarioService.activadorMensaje$.subscribe(
      dato=> {this.mensajeActivo=dato
              console.log('Estado del mensaje:', dato);
  }
)

    if (localStorage.getItem('token')) {
      this.textButton = 'Cerrar Sesion'
      this.perfilActivo = true;
      this.dbUsuarioId();
    }
      console.log("dato es",this.mensajeActivo)



  }


  public activarMensaje()
  {
    this.mensajeActivo=true
  }

  dbUsuarioId() {
    this.secretId = this.auth.getTokenValue();
    this.usuarioService.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;
          this.usuario.Username=valor.Username
          this.usuario.Password = valor.Password
          this.usuario.id = valor.id
          this.usuario.CombatesGanados = valor.CombatesGanados;
          for (let i = 0; i < valor.box.length; i++) {
            this.usuario.box[i] = valor.box[i]
          }

          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco
          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion++;
          })
          this.usuario.ListaFavoritos = valor.ListaFavoritos;
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

  goToPerfil() {
    this.mensajeActivo=false
    this.Router.navigate(['/perfil']);
  }

  goToObjetos() {
    this.mensajeActivo=false
    this.Router.navigate(['lista-objetos']);
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

  tutorialService = inject(TutorialService);

  mostrarAyuda() {
    this.tutorialService.mostrarTutorial();
  }
}
