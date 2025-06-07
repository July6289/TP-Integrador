import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { CajaService } from '../../pokeservices/caja.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { TutorialService } from '../../pokeservices/tutorial.service';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit, OnDestroy {
  textButton: string = 'Iniciar Sesion'
  perfilActivo: boolean = false;
  mensajeActivo: boolean = false;
  auth = inject(AuthService);
  Router = inject(Router);
  cajaService = inject(CajaService);
  tutorialService = inject(TutorialService);
  posicion: number = 0;
  usuario: Usuario = {
    id: "",
    box: [],
    Email: "",
    Username: "",
    Password: "",
    CombatesGanados: 0,
    UrlImagenPerfil: '',
    ListaFavoritos: [],
    ListaObjetos: [],
    ListaEquipos: []
  }
  secretId: string | null = "";
  private destroy$ = new Subject<void>();


  constructor(private usuarioService: UsuarioService, private pokeservce: PokeservicesService, private equposervice: EquipoPokemonService) { }

  ngOnInit(): void {
    this.usuarioService.activadorMensaje$.pipe(takeUntil(this.destroy$))
      .subscribe(dato => this.mensajeActivo = dato);

    this.usuarioService.actualizarperfil$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dato => this.usuario.UrlImagenPerfil = dato);

    if (localStorage.getItem('token')) {
      this.textButton = 'Cerrar Sesion';
      this.perfilActivo = true;
      this.dbUsuarioId();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dbUsuarioId() {
    this.secretId = this.auth.getTokenValue();
    this.usuarioService.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario = {
            ...this.usuario, // conserva posibles valores anteriores
            Email: valor.Email,
            Username: valor.Username,
            Password: valor.Password,
            id: valor.id,
            CombatesGanados: valor.CombatesGanados,
            UrlImagenPerfil: valor.UrlImagenPerfil,
            ListaFavoritos: valor.ListaFavoritos,
            ListaObjetos: valor.ListaObjetos,
            ListaEquipos: valor.ListaEquipos,
            box: valor.box.map(caja => ({
              imagen: caja.imagen,
              pokemones: caja.pokemones
            }))
          };
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

  goToPerfil() {
    this.mensajeActivo = false
    this.Router.navigate(['/perfil']);
  }

  goToObjetos() {
    this.mensajeActivo = false
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
      this.pokeservce.limpiarCaja()
      this.pokeservce.vaciarFavoritos()
      this.equposervice.limpiarEquipo()
      localStorage.clear();
    }
  }

  llamarDbGuardarDatos(): void {
    this.cajaService.dbGuardarDatos(this.usuario, this.secretId || '');
  }

  mostrarAyuda() {
    this.tutorialService.mostrarTutorial();
  }
}
