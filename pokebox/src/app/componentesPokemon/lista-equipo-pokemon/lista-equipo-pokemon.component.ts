import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { NgFor, Location, NgIf } from '@angular/common';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';
import { CajaService } from '../../pokeservices/caja.service';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-lista-equipo-pokemon',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './lista-equipo-pokemon.component.html',
  styleUrl: './lista-equipo-pokemon.component.css'
})

export class ListaEquipoPokemonComponent {

  constructor(private router: Router, private equipoPokemonService: EquipoPokemonService, private location: Location, private cajaService: CajaService, private usuarioService: UsuarioService, private auth: AuthService) { }

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
    Username: "",
    Password: ""
  }
  posicion: number = 0;
  secretId: string | null = ""

  ngOnInit() {
    // Suscribirse a todos los equipos
    this.equipoPokemonService.equipos$.subscribe(equipos => {
      this.poketeam = equipos;  // Actualiza el arreglo con todos los equipos
    });

    this.secretId = this.auth.getTokenValue();
    this.dbUsuarioId()
    this.checkRoute();
  }

  dbUsuarioId() {
    this.usuarioService.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Username = valor.Username;
          this.usuario.Password = valor.Password
          this.usuario.id = valor.id

          for (let i = 0; i < valor.box.length; i++) {
            this.usuario.box[i] = valor.box[i];
          }

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
}
