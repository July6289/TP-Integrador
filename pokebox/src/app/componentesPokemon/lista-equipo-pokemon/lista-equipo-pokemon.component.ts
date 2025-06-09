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
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { TutorialService } from '../../pokeservices/tutorial.service';

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
    Username: "",
    Password: "",
    CombatesGanados: 0,
    UrlImagenPerfil: '',
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
  private destroy$ = new Subject<void>();


  ngOnInit() {
    this.dbUsuarioId()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usuario: Usuario) => {
          this.usuario = { ...usuario };
          this.usuario.box = [...usuario.box];
          this.equipoPokemonService.setEquipo(usuario.ListaEquipos);
        }
      });

    this.equipoPokemonService.equipos$
      .pipe(takeUntil(this.destroy$))
      .subscribe(equipos => this.poketeam = equipos);

    this.tutorialSub = this.tutorialService.mostrarTutorial$.subscribe(
      mostrar => this.mostrarTutorial = mostrar
    );

    this.checkRoute();
  }


  dbUsuarioId(): Observable<Usuario> {
    this.secretId = this.auth.getTokenValue();
    return this.usuarioService.getUsuarioById(this.secretId);
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

  eliminarElemento(index: number) {
    const confirmar = confirm('¿Estás seguro de que querés eliminar este equipo?');
    if (confirmar) {
      this.equipoPokemonService.eliminarEquipo(index);
    }
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
