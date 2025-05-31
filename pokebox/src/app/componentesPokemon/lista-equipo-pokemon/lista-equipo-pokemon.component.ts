import { Router, RouterModule } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { NgFor, Location, NgIf, NgClass } from '@angular/common';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';
import { CajaService } from '../../pokeservices/caja.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { AuthService } from '../../auth/service/auth.service';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Subscription } from 'rxjs';
import { TutorialService } from '../../pokeservices/tutorial.service';
import { TutorialComponent } from '../tutorial/tutorial.component';

@Component({
  selector: 'app-lista-equipo-pokemon',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, NgClass],
  templateUrl: './lista-equipo-pokemon.component.html',
  styleUrl: './lista-equipo-pokemon.component.css'
})

export class ListaEquipoPokemonComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private equipoPokemonService: EquipoPokemonService, private location: Location, private cajaService: CajaService, private usuarioService: UsuarioService, private auth: AuthService, private tutorialService: TutorialService) { }

  poketeam: EquipoPokemon[] = [];
  equipoRival: EquipoPokemon =
    {
      nombre: "",
      equipo: []
    }
  rutaCombate = true;
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
  posicion: number = 0;
  posicion2: number = 0
  pokeservice = inject(PokeservicesService)
  secretId: string | null = ""
  mostrarTutorial: boolean = false;
  private tutorialSub?: Subscription;

  ngOnInit() {
    this.tutorialSub = this.tutorialService.mostrarTutorial$.subscribe(
      mostrar => this.mostrarTutorial = mostrar
    );

    // Suscribirse a todos los equipos
    this.equipoPokemonService.equipos$.subscribe(equipos => {
      this.poketeam = equipos;  // Actualiza el arreglo con todos los equipos
    });

    this.secretId = this.auth.getTokenValue();
    this.dbUsuarioId()

    setTimeout(() => {
      if (this.usuario.ListaEquipos.length > 0) {
        this.equipoPokemonService.setEquipo(this.usuario.ListaEquipos)
      }
    }, 300);

    this.checkRoute();
  }

  dbUsuarioId() {
    this.usuarioService.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;
          this.usuario.Password = valor.Password
          this.usuario.id = valor.id
          this.usuario.CombatesGanados = valor.CombatesGanados;

          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco

          //la forma definitiva de evitar el undefined
          this.usuario.box = this.pokeservice.cajas
          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion = this.posicion + 1;
          })
          this.usuario.ListaFavoritos = [...valor.ListaFavoritos];
          this.usuario.ListaObjetos = [...valor.ListaObjetos];

          this.usuario.ListaEquipos = valor.ListaEquipos.map(equipo => ({
            nombre: equipo.nombre,
            equipo: [...equipo.equipo] // clon defensivo si querés evitar referencias compartidas
          }));
        },

        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

  llamarDbGuardarDatos(): void {
    if (this.secretId === null) {
      this.secretId = ""
    }

    this.cajaService.dbGuardarDatos(this.usuario, this.secretId);
  }

  checkRoute(): void {
    this.rutaCombate = this.location.path().includes('/main-page');
  }

  // Eliminar un elemento específico
  eliminarElemento(index: number) {
    this.equipoPokemonService.eliminarEquipo(index);
  }

  goToCrearEquipo() {
    this.router.navigate(['/equipo-pokemon']);
  }

  gotoMain() {
    this.router.navigate(['/**']);
  }

  seleccionarEquipo(team: EquipoPokemon) {
    this.equipoPokemonService.EquipoSeleccionado(team);
    this.equipoRival.nombre = "";
    this.equipoRival.equipo = [];
    this.equipoPokemonService.EquipoSeleccionadoBot(this.equipoRival);

    if (typeof structuredClone === 'function') {
      this.equipoRival = structuredClone(this.equipoPokemonService.recibirEquipoPokemonRival());
    }

    setTimeout(() => {
      this.router.navigate(['/combate'])
    }, 1000);

    this.equipoPokemonService.EquipoSeleccionadoBot(this.equipoRival);
  }

  goToVisualizarpokemon(nombre: string) {
    console.log(`Navegando a equipo con nombre: ${nombre}`);
    this.router.navigate(['/equipo', nombre]);
  }

  cambiarNombreEquipo(index: number) {
    const nuevoNombre = prompt('Introduce un nuevo nombre para el equipo (Máximo 14 caracteres)', 'Nuevo nombre');
    if (nuevoNombre && nuevoNombre.length <= 14) {
      this.equipoPokemonService.actualizarNombreEquipo(index, nuevoNombre);
    } else {
      alert('El nombre debe tener entre 1 y 14 caracteres.');
    }
  }

  cerrarTutorial() {
    this.tutorialService.ocultarTutorial();
  }

  ngOnDestroy() {
    this.tutorialSub?.unsubscribe();
  }
}
