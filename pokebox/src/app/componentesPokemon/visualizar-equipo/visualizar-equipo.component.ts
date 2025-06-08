import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { TutorialService } from '../../pokeservices/tutorial.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visualizar-equipo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizar-equipo.component.html',
  styleUrl: './visualizar-equipo.component.css'
})

export class VisualizarEquipoComponent implements OnInit, OnDestroy {
  pokemonesEnEquipo: Pokemon[] = [];
  nombreEquipo: string = '';
  posicion: number = 0;
  posicion2: number = 0;
  clave: string | null = ''
  id: string | null = '';
  usuario: Usuario = {
    id: "",
    box: [],
    Email: "",
    Username:"",
    Password: "",
    CombatesGanados: 0,
    UrlImagenPerfil:'',
    ListaFavoritos: [],
    ListaObjetos: [],
    ListaEquipos: []
  }
  usuarioServicio = inject(UsuarioService)
  pokeservice = inject(PokeservicesService)
    mostrarTutorial: boolean = false;
    private tutorialSub?: Subscription;

  constructor(private route: ActivatedRoute, private equipoPokemonService: EquipoPokemonService, private router: Router, private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.tutorialSub = this.tutorialService.mostrarTutorial$.subscribe(
      mostrar => this.mostrarTutorial = mostrar
    );

    // Obtener el parámetro 'nombre' de la URL
    this.id = localStorage.getItem('token')
    this.usuarioServicio.getUsuarioById(this.id).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;
          this.usuario.Password = valor.Password
          this.usuario.id = valor.id
          this.usuario.Username=valor.Username
          this.usuario.CombatesGanados = valor.CombatesGanados;
          this.usuario.UrlImagenPerfil=valor.UrlImagenPerfil;
          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco

          this.usuario.box=this.pokeservice.cajas //setear cajas es obligatorio, sino son indefinidas

          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion = this.posicion + 1;
          })
           this.usuario.ListaFavoritos = [...valor.ListaFavoritos];
          this.usuario.ListaObjetos = [...valor.ListaObjetos];
          this.usuario.ListaEquipos = [...valor.ListaEquipos]

          console.log(this.usuario.ListaEquipos)

          this.equipoPokemonService.setEquipo(this.usuario.ListaEquipos)

          this.route.paramMap.subscribe(params => {
            this.nombreEquipo = params.get('nombre')!;
            this.obtenerEquipo(this.nombreEquipo);
          });

        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )







  }

  cerrarTutorial() {
    this.tutorialService.ocultarTutorial();
  }

  ngOnDestroy() {
    this.tutorialSub?.unsubscribe();
  }

  gotoMainMenu() {
    this.router.navigate(['/**']);
  }

  gotoCombate() {
    this.usuarioServicio.desactivarMensaje()
    this.router.navigate(['/selector']);
  }

  ponerMote(pokemon: Pokemon) {
    let mote: string | null;
    mote = prompt("Aquí puedes cambiarle el nombre. Escribe lo que quieras!", pokemon.name);
    if (mote !== null) {
      // Buscar la instancia específica en pokemonesEnEquipo y actualizarla
      const index = this.pokemonesEnEquipo.findIndex(p => p.id === pokemon.id);
      if (index !== -1) {
        this.pokemonesEnEquipo[index].name = mote;
      }
    }
  }

  obtenerEquipo(nombre: string): void {
    const equipo = this.equipoPokemonService.obtenerEquipoPorNombre(nombre);
    if (equipo) {
      this.pokemonesEnEquipo = equipo.equipo;
    } else {
      console.error('Equipo no encontrado');
    }
  }
}
