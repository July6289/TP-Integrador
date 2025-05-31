import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { CajaService } from '../../pokeservices/caja.service';
import { AuthService } from '../../auth/service/auth.service';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { Subscription } from 'rxjs';
import { TutorialService } from '../../pokeservices/tutorial.service';

@Component({
  selector: 'app-pestania-combate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pestania-combate.component.html',
  styleUrl: './pestania-combate.component.css'
})
export class PestaniaCombateComponent implements OnInit, OnDestroy {
  private tablaTiposValores: number[][] = [
    /*n    l    vo   ve   t    r    b   fa   ac   fu   ag   pl    e   ps   hi    d    s   ha         */
    [1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 0.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],//normal
    [2.0, 1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 0.5],//lucha
    [1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0],//volador
    [1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 0.5, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0],//veneno
    [1.0, 1.0, 0.0, 2.0, 1.0, 2.0, 0.5, 1.0, 2.0, 2.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0],//tierra
    [1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 2.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0],//roca
    [1.0, 0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 2.0, 0.5],//bicho
    [0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 1.0],//fantasma
    [1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 0.5, 1.0, 2.0, 1.0, 1.0, 2.0],//acero
    [1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 0.5, 0.5, 2.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0],//fuego
    [1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0],//agua
    [1.0, 1.0, 0.5, 0.5, 2.0, 2.0, 0.5, 1.0, 0.5, 0.5, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0],//planta
    [1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 0.5, 1.0, 1.0],//electrico
    [1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 0.0, 1.0],//psiquico
    [1.0, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 2.0, 1.0, 1.0, 0.5, 2.0, 1.0, 1.0],//hielo
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.0],//dragon
    [1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5],//siniestro
    [1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0],//hada
  ]
  private tablaTiposNombres: string[] = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"]
  equipoMain: EquipoPokemon =
    {
      nombre: "",
      equipo: []
    }
  equipoRival: EquipoPokemon =
    {
      nombre: "",
      equipo: []
    }
  peleador: number = 0;
  peleadorBot: number = 0;
  turno: boolean = true;
  mensaje: string[] = [];
  secretId: string | null = '';
  posicion: number = 0;
  pokeservice = inject(PokeservicesService)
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
  cajaservice = inject(CajaService);
  auth = inject(AuthService);
  usuarioService = inject(UsuarioService);
  mostrarTutorial: boolean = false;
  private tutorialSub?: Subscription;

  constructor(private service: EquipoPokemonService, private router: Router, private tutorialService: TutorialService) { }

  getpokemonFight() {
    this.peleador = this.service.getPosicionEquipo();
  }

  ngOnInit(): void {
    this.tutorialSub = this.tutorialService.mostrarTutorial$.subscribe(
      mostrar => this.mostrarTutorial = mostrar
    );
    this.getTeams()
    this.turno = this.service.getTurno();
    this.secretId = localStorage.getItem('token');
    this.dbUsuarioId()
  }

  cerrarTutorial() {
    this.tutorialService.ocultarTutorial();
  }

  ngOnDestroy() {
    this.tutorialSub?.unsubscribe();
  }

  dbUsuarioId() {
    this.secretId = this.auth.getTokenValue();
    this.usuarioService.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;
          this.usuario.Password = valor.Password
          this.usuario.id = valor.id
          this.usuario.CombatesGanados = valor.CombatesGanados;
          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco
          this.usuario.box = this.pokeservice.cajas
          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion = this.posicion + 1;
          })
          this.usuario.ListaFavoritos = [...valor.ListaFavoritos];
          this.usuario.ListaObjetos = [...valor.ListaObjetos];
          this.usuario.ListaEquipos = [...valor.ListaEquipos]
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

  getTeams() {
    // Verifica compatibilidad antes de usar structuredClone
    if (typeof structuredClone === 'function') {
      this.equipoMain = structuredClone(this.service.recibirEquipoPokemon());
    } else {
      this.equipoMain = JSON.parse(JSON.stringify(this.service.recibirEquipoPokemon()));
    }

    this.equipoRival = JSON.parse(JSON.stringify(this.service.recibirEquipoPokemonRival()));
    this.getpokemonFight();
  }

  deletePokemon(equipoPerdedor: EquipoPokemon) {
    for (let i = 0; i < equipoPerdedor.equipo.length; i++) {
      if (equipoPerdedor.equipo[i].isAlive === false) {
        return equipoPerdedor = this.service.eliminarpokemonPerdedor(i, equipoPerdedor);
      }
    }
    return equipoPerdedor
  }

  toMainMenu() {
    this.equipoRival.nombre = "";
    this.equipoRival.equipo = [];
    this.service.EquipoSeleccionadoBot(this.equipoRival);
    this.cajaservice.dbGuardarDatos(this.usuario, this.secretId);
    this.router.navigate(['/**']);
  }

  calcularAnchoVida(pokemon: Pokemon): string {
    if (pokemon && pokemon.life !== undefined) {
      return `${(pokemon.life * 100) / 16}%`;
    }
    return '0%';
  }

  tablaDeTipos(idPeleador: number, idBot: number, turno: boolean) {
    let danio = 0;
    let indiceTipos = {
      jugadorTipo1: -1,
      jugadorTipo2: -1,
      botTipo1: -1,
      botTipo2: -1
    }

    //buscar indice tipos tipos
    for (let i = 0; i < this.tablaTiposNombres.length; i++) {
      if (this.equipoMain.equipo[idPeleador].types[0].type.name === this.tablaTiposNombres[i]) {
        indiceTipos.jugadorTipo1 = i;
      }

      if (this.equipoMain.equipo[idPeleador].types[1] && this.equipoMain.equipo[idPeleador].types[1].type.name === this.tablaTiposNombres[i]) {
        indiceTipos.jugadorTipo2 = i;
      }

      if (this.equipoRival.equipo[idBot].types[0].type.name === this.tablaTiposNombres[i]) {
        indiceTipos.botTipo1 = i;
      }

      if (this.equipoRival.equipo[idBot].types[1] && this.equipoRival.equipo[idBot].types[1].type.name === this.tablaTiposNombres[i]) {
        indiceTipos.botTipo2 = i;
      }
    }
    /*---------------------*/

    //calculadora de daño
    if (turno) {
      if (indiceTipos.jugadorTipo2 !== -1 && indiceTipos.botTipo2 !== -1) {
        danio = 2 * ((this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo2]) + (this.tablaTiposValores[indiceTipos.jugadorTipo2][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo2][indiceTipos.botTipo2]));
      }
      else if (indiceTipos.jugadorTipo2 !== -1 && indiceTipos.botTipo2 === -1) {
        danio = 2 * (this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo2][indiceTipos.botTipo1]);
      }
      else if (indiceTipos.jugadorTipo2 === -1 && indiceTipos.botTipo2 !== -1) {
        danio = 2 * (this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo2]);
      }
      else {
        danio = 2 * this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1];
      }

      this.mensaje[this.mensaje.length] = this.equipoMain.equipo[idPeleador].name + " infligió " + danio + " de daño a " + this.equipoRival.equipo[idBot].name;
    }
    else {
      if (indiceTipos.jugadorTipo2 !== -1 && indiceTipos.botTipo2 !== -1) {
        danio = 2 * ((this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo1] * this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo2]) + (this.tablaTiposValores[indiceTipos.botTipo2][indiceTipos.jugadorTipo1] * this.tablaTiposValores[indiceTipos.botTipo2][indiceTipos.jugadorTipo2]));
      }
      else if (indiceTipos.jugadorTipo2 !== -1 && indiceTipos.botTipo2 === -1) {
        danio = 2 * (this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo1] * this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo2]);
      }
      else if (indiceTipos.jugadorTipo2 === -1 && indiceTipos.botTipo2 !== -1) {
        danio = 2 * (this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo1] * this.tablaTiposValores[indiceTipos.botTipo2][indiceTipos.jugadorTipo1]);
      }
      else {
        danio = 2 * this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo1];
      }

      this.mensaje[this.mensaje.length] = this.equipoRival.equipo[idBot].name + " infligió " + danio + " de daño a " + this.equipoMain.equipo[idPeleador].name;
    }

    return danio;
  }

  pelea(pokemonJugador: Pokemon, pokemonBot: Pokemon) {
    pokemonJugador.life = this.inicializarVidas(pokemonJugador)
    pokemonBot.life = this.inicializarVidas(pokemonBot)

    if (this.turno) {
      pokemonBot.life -= this.tablaDeTipos(this.peleador, this.peleadorBot, this.turno)
      this.mensaje[this.mensaje.length] = " la vida del pokemon rival es: " + pokemonBot.life
      this.mensaje[this.mensaje.length] = " "
    }
    else {
      pokemonJugador.life -= this.tablaDeTipos(this.peleador, this.peleadorBot, this.turno);
      this.mensaje[this.mensaje.length] = " la vida de tu pokemon es: " + pokemonJugador.life
      this.mensaje[this.mensaje.length] = " "
    }


    this.turno = !this.turno;
    if (pokemonJugador.life <= 0) {
      pokemonJugador.isAlive = false;
    }
    else if (pokemonBot.life <= 0) {
      pokemonBot.isAlive = false;
    }
  }

  /*------------------------------------------------------------------------------------------------------*/
  combate() {
    let turn = 0;
    this.mensaje.splice(0, this.mensaje.length);
    while (this.checkStstate(this.equipoMain.equipo[this.peleador]) && this.checkStstate(this.equipoRival.equipo[this.peleadorBot])) {
      this.pelea(this.equipoMain.equipo[this.peleador], this.equipoRival.equipo[this.peleadorBot]);
      turn++;

      if (!this.checkStstate(this.equipoMain.equipo[this.peleador]) || !this.checkStstate(this.equipoRival.equipo[this.peleadorBot]) || turn % 2 === 0) {
        break;
      }
    }

    if (!this.checkStstate(this.equipoMain.equipo[this.peleador])) {
      alert("tu pokemon esta debilitado!")
    } else if (!this.checkStstate(this.equipoRival.equipo[this.peleadorBot])) {
      alert("el pokemon rival esta debilitado!")
    }

    if (!this.alguienVivo(this.equipoMain, true) || !this.alguienVivo(this.equipoRival, false)) {
      this.ganador();
    }
  }

  checkStstate(pkmn: Pokemon) {
    if (pkmn !== undefined && pkmn.isAlive) {
      return true;
    } else {
      this.turno = !this.turno;
      return false;
    }
  }

  alguienVivo(team: EquipoPokemon, flag: boolean) {
    let alive = false;
    if (team.equipo.length !== 0) {
      for (let i = 0; i < team.equipo.length; i++) {
        if (team.equipo[i].isAlive) {
          alive = true;
        }
        else {
          this.deletePokemon(team);
          if (team.equipo.length !== 0) {
            if (flag) {
              this.gotoSlector();
            }
            else {
              alert("el siguiente pokemon del rival es: " + team.equipo[0].name)
              this.gotoSlector();
            }
          }
        }
      }

      return alive;
    }
    else {
      return alive
    }
  }

  ganador() {
    if (this.equipoMain.equipo.length === 0) {
      alert("perdiste");
      this.toMainMenu()
    }
    else if (this.equipoRival.equipo.length === 0) {
      alert("Ganaste el combate!");
      this.usuario.CombatesGanados += 1;
      this.toMainMenu()
    }
  }

  inicializarVidas(pokemonto: Pokemon) {
    if (!pokemonto.life) {
      return 16;
    }
    else {
      return pokemonto.life
    }
  }

  gotoSlector() {
    const nombreJugador = this.equipoMain.equipo[this.peleador]?.name || '';
    const nombreRival = this.equipoRival.equipo[this.peleadorBot]?.name || '';
    this.service.guardarNombresCombate(nombreJugador, nombreRival);
    this.service.EquipoSeleccionado(this.equipoMain);
    this.service.EquipoSeleccionadoBot(this.equipoRival);
    this.service.guardarTurno(!this.turno);
    this.router.navigate(['/cambiar-pokemon']);
  }
}
