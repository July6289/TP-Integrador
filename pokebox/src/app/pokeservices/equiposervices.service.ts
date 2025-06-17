// equiposervices.service.ts
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EquipoPokemon } from '../interfaces/interfazpokemon/Equipo.interface';
import { PokeservicesService } from './pokeservices.service';
import { Pokemon } from '../interfaces/interfazpokemon/Pokemon.inteface';
import { Usuario } from '../interfaces/interfaz-usuario/Usuario.interface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})

export class EquipoPokemonService {
  private equipos: EquipoPokemon[] = [];
  private equiposSubject = new BehaviorSubject<EquipoPokemon[]>(this.equipos);
  equipos$ = this.equiposSubject.asObservable();
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
  clave: string | null = ''
  poketeam: EquipoPokemon =
    {
      nombre: "",
      equipo: []
    }
  pokeRival: EquipoPokemon =
    {
      nombre: "",
      equipo: []
    }
  pokemonTeam: Pokemon[] = [];
  selectedPokemon: number = 0;
  turns: boolean = true;
  usuarioService = inject(UsuarioService)

  constructor(private pokeService: PokeservicesService) { }

  getid() {
    this.clave = localStorage.getItem('token')
  }

  public limpiarEquipo() {
    this.equiposSubject.next([])
  }
  public setEquipo(equipo: EquipoPokemon[]) {
    const nuevoEquipo = equipo.map(equ => ({
      nombre: equ.nombre,
      equipo: [...equ.equipo]
    }))
    this.equipos = nuevoEquipo
    this.equiposSubject.next([...this.equipos])
  }

  actualizarEquipo(nuevoEquipo: EquipoPokemon) {
    this.equipos.push(nuevoEquipo);
    this.equiposSubject.next([...this.equipos]);  // Emitir copia del arreglo actualizado
    this.getid()
    this.usuarioService.getUsuarioById(this.clave).subscribe({
      next: (valor: Usuario) => {
        this.usuario = valor
        console.log(this.equiposSubject.value)
        this.usuario.ListaEquipos = [...this.equiposSubject.value]
        this.usuarioService.putUsuario(this.usuario, this.clave).subscribe({
          next: () => console.log('equipos actualizado con exito.'),
          error: (e: Error) => console.error('Error al guardar el usuario:', e.message),
        });
      },
      error: (e: Error) => console.error('Error al obtener el usuario para actualizar el equipo:', e.message),
    });
  }

  eliminarEquipo(index: number) {
    this.equipos.splice(index, 1);
    this.equiposSubject.next([...this.equipos]);  // Emitir copia del arreglo actualizado tras eliminación
    this.getid()
    this.usuarioService.getUsuarioById(this.clave).subscribe({
      next: (valor: Usuario) => {
        this.usuario = valor
        this.usuario.ListaEquipos = [...this.equipos]
        this.usuarioService.putUsuario(this.usuario, this.clave).subscribe({
          next: () => console.log('equipos eliminado.'),
          error: (e: Error) => console.error('Error al guardar el usuario:', e.message),
        });
      },
      error: (e: Error) => console.error('Error al obtener el usuario para eliminar el equipo:', e.message),
    });
  }

  eliminarpokemonPerdedor(index: number, pokeEquipo: EquipoPokemon): EquipoPokemon {
    pokeEquipo.equipo.splice(index, 1);
    return pokeEquipo;
  }

  actualizarNombreEquipo(index: number, nuevoNombre: string) {
    if (this.equipos[index]) {
      this.equipos[index].nombre = nuevoNombre;
      this.equiposSubject.next([...this.equipos]); // Emitir copia actualizada
      this.getid()
      this.usuarioService.getUsuarioById(this.clave).subscribe({
        next: (valor: Usuario) => {
          this.usuario = valor
          this.usuario.ListaEquipos = [...this.equipos]
          this.usuarioService.putUsuario(this.usuario, this.clave).subscribe({
            next: () => console.log('nombre del equipo actualizado.'),
            error: (e: Error) => console.error('Error al guardar el usuario:', e.message),
          });
        },
        error: (e: Error) => console.error('Error al obtener el usuario para eliminar el equipo:', e.message),
      });
    }
  }

  // Método para obtener un equipo por su nombre
  obtenerEquipoPorNombre(nombre: string): EquipoPokemon | undefined {
    return this.equipos.find(equipo => equipo.nombre === nombre);
  }

  EquipoSeleccionado(equipoSeleccionado: EquipoPokemon) {
    this.poketeam = equipoSeleccionado;
  }

  EquipoSeleccionadoBot(equipoSeleccionado: EquipoPokemon) {
    this.pokeRival = equipoSeleccionado;
  }

  guardarTurno(t1: boolean) {
    this.turns = t1;
  }

  getTurno(): boolean {
    return this.turns;
  }

  recibirEquipoPokemon(): EquipoPokemon {
    return this.poketeam;
  }

  recibirEquipoPokemonRival(): EquipoPokemon {
    if (this.pokeRival.nombre === "") {
      this.pokeService.getRandomPokemonTeam().subscribe({
        next: (team) => {
          this.pokemonTeam = team;
          for (let i = 0; i < this.pokemonTeam.length; i++) {
            this.pokemonTeam[i].isAlive = true;
          }

          this.pokeRival = {
            nombre: "Rival",
            equipo: this.pokemonTeam
          }
        }
      })
      return this.pokeRival;
    }
    else {
      return this.pokeRival;
    }
  }

  setPosicionEquipo(id: number) {
    this.selectedPokemon = id;
  }

  getPosicionEquipo() {
    return this.selectedPokemon;
  }

  // equipoPokemonService.ts
  private nombreRival = '';
  private nombrePropio = '';

  guardarNombresCombate(nombreJugador: string, nombreRival: string): void {
    this.nombrePropio = nombreJugador;
    this.nombreRival = nombreRival;
  }

  obtenerNombreJugador(): string {
    return this.nombrePropio;
  }

  obtenerNombreRival(): string {
    return this.nombreRival;
  }
}
