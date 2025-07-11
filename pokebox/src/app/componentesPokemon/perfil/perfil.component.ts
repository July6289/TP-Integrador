import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Usuario } from '../../interfaces/interfaz-usuario/Usuario.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';
import { PokeservicesService } from '../../pokeservices/pokemon.service';
import { TutorialService } from '../../pokeservices/tutorial.service';
import { CommonModule } from '@angular/common';
import { of, Subscription, catchError } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { EquipoPokemonService } from '../../pokeservices/equipo.service';

@Component({
  selector: 'perfil',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent implements OnInit, OnDestroy {
  id: string | null = ""
  visible: boolean = false;
 changetype: boolean = true;
  posicion: number = 0;
  posicion2: number = 0;
  isModifyShowing: boolean = false;
  validadorMensajeEspecifico: boolean = false;
  MensajeEspecifico: string = '';
  isCardShowing: boolean = true;
  isDeleteShowing: boolean = false;
  isLoggedWithouthGoogle: boolean = true;
  selectedAvatar: string | null = null;
  mostrarSelectorAvatar: boolean = false;
mostrarBotonVerificarCorreo: boolean = false;
  usarioServicio = inject(UsuarioService);
  pokeservice = inject(PokeservicesService)
  usuario: Usuario = {
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
  fb = inject(FormBuilder);
  authservice = inject(AuthService);
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  formularioDatosCortos = this.fb.nonNullable.group(
    {
      Username: ['', [Validators.required, Validators.minLength(4)]],
      Password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)]],
    }
  )
  formularioCorrreo=this.fb.nonNullable.group(
    {
      Email:['',[Validators.required,Validators.email]]
    }

  )
  mostrarTutorial: boolean = false;
  private tutorialSub?: Subscription;
  avatarList: string[] = [
    '/assets/imagenes/imagen_pokemon1.png',
    '/assets/imagenes/imagen_pokemon2.png',
    '/assets/imagenes/imagen_pokemon3.png',
    '/assets/imagenes/imagen_pokemon4.png',
    '/assets/imagenes/imagen_pokemon5.png',
    '/assets/imagenes/imagen_pokemon6.png',
    '/assets/imagenes/imagen_pokemon7.png',
    '/assets/imagenes/imagen_pokemon8.png',
    '/assets/imagenes/imagen_pokemon9.png',
    '/assets/imagenes/imagen_pokemon10.png',
    '/assets/imagenes/imagen_pokemon11.png',
  ];

  constructor(private tutorialService: TutorialService,private equiposervice:EquipoPokemonService) { }

  ngOnInit(): void {
    this.tutorialSub = this.tutorialService.mostrarTutorial$.subscribe(
      mostrar => this.mostrarTutorial = mostrar
    );

    of(localStorage.getItem('token'))
      .pipe(
        filter((id): id is string => !!id),
        switchMap((id: string) => {
          this.id = id;
          return this.usarioServicio.getUsuarioById(id);
        })
      )
      .subscribe({
        next: (valor: Usuario) => {
          this.usuario = { ...valor };
          this.selectedAvatar = valor.UrlImagenPerfil;
          this.formularioDatosCortos.patchValue({
            Username: valor.Username,
            Password: valor.Password || ''
          });
          this.isLoggedWithouthGoogle = !!valor.Password;
          this.usuario.box = this.pokeservice.cajas;
          valor.box.forEach((caja, index) => {
            this.usuario.box[index].imagen = caja.imagen;
            this.usuario.box[index].pokemones = caja.pokemones;
          });
          this.usuarioService.cambiarUrl(valor.UrlImagenPerfil);
        },
        error: err => {
          console.error('Error cargando usuario:', err);
        }
      });
  }

  seleccionarAvatar(avatar: string): void {
    this.selectedAvatar = avatar;
    this.mostrarSelectorAvatar = false; // cerrar selector al elegir
    this.isCardShowing = true
    this.usuario.UrlImagenPerfil = this.selectedAvatar
    this.usuarioService.putUsuario(this.usuario, this.id).subscribe(
      {
        next: () => {
          console.log("imagen actualizada con exito");
          this.usarioServicio.cambiarUrl(this.usuario.UrlImagenPerfil)
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

 viewpass() {
    this.visible = !this.visible
    this.changetype = !this.changetype
  }

  cerrarTutorial() {
    this.tutorialService.ocultarTutorial();
  }

  ngOnDestroy() {
    this.tutorialSub?.unsubscribe();
  }

  cancelar() {
    this.isCardShowing = true;
    this.isModifyShowing = false;
    this.validadorMensajeEspecifico=false
  }

  dbUsuarioId() {
    this.usarioServicio.getUsuarioById(this.id).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;
          this.usuario.Username = valor.Username
          if (valor.Password === null || !valor.Password.length) {
            this.isLoggedWithouthGoogle = false; // Tiene cuenta de Google
          }
          else {
            this.usuario.Password = valor.Password
            this.isLoggedWithouthGoogle = true;
          }

          this.usuario.id = valor.id
          this.usuario.CombatesGanados = valor.CombatesGanados;
          this.usuario.UrlImagenPerfil = valor.UrlImagenPerfil
          this.selectedAvatar = this.usuario.UrlImagenPerfil
          this.usuario.box = this.pokeservice.cajas
          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion = this.posicion + 1;
          })
          this.usuario.ListaFavoritos = [...valor.ListaFavoritos];
          this.usuario.ListaObjetos = [...valor.ListaObjetos];
          this.usuario.ListaEquipos = [...valor.ListaEquipos]
          this.formularioDatosCortos.patchValue({
            Username: this.usuario.Username,
            Password: this.usuario.Password || '' // si es nulo, que quede vacío
          });
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

  addUsuario() {
    if (this.formularioDatosCortos.invalid) {
      console.log("Error");
    }
    else {
      const datosFormulario = this.formularioDatosCortos.getRawValue();
        this.usuario.Username = datosFormulario.Username;
        this.usuario.Password = datosFormulario.Password;
        this.usuarioService.putUsuario(this.usuario, this.id).subscribe(
          {
            next: () => {
              console.log("enviado con exito");
              this.isCardShowing = true;
              this.isModifyShowing = false;
              this.formularioDatosCortos.reset();
            },
            error: (e: Error) => {
              console.log(e.message);
              this.formularioDatosCortos.reset();
            }
          }
        )


    }
  }

  toggleModify() {
    this.isCardShowing = false;
    this.formularioDatosCortos.patchValue({
            Username: this.usuario.Username,
            Password: this.usuario.Password || '' // si es nulo, que quede vacío
          });
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
          localStorage.clear();
          this.pokeservice.limpiarCaja()
          this.pokeservice.vaciarFavoritos()
          this.equiposervice.limpiarEquipo()


          this.router.navigate(['/registro']);
        },
        error: (e: Error) => {
          console.log(e);
        }
      }
    )
  }

  mostrarSelector() {
    this.mostrarSelectorAvatar = true
    this.isCardShowing = false
  }

}
