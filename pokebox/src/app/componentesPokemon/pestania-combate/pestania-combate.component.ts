import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pestania-combate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pestania-combate.component.html',
  styleUrl: './pestania-combate.component.css'
})
export class PestaniaCombateComponent implements OnInit {
  private tablaTiposValores: number[][] = [
    /*    n    l    vo   ve   t    r    b   fa   ac   fu   ag   pl    e   ps   hi    d    s   ha         */
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

  constructor(private service: EquipoPokemonService, private pokeservicesService: PokeservicesService, private router: Router) { }

  getpokemonFight() {
    this.peleador = this.service.getPosicionEquipo();
  }

  ngOnInit(): void {
    this.getTeams()
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

    this.router.navigate(['/**']);
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
        danio = 4 * ((this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo2]) * (this.tablaTiposValores[indiceTipos.jugadorTipo2][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo2][indiceTipos.botTipo2]));
      }
      else if (indiceTipos.jugadorTipo2 !== -1 && indiceTipos.botTipo2 === -1) {
        danio = 4 * (this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo2][indiceTipos.botTipo1]);
      }
      else if (indiceTipos.jugadorTipo2 === -1 && indiceTipos.botTipo2 !== -1) {
        danio = 4 * (this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo2]);
      }
      else {
        danio = 4 * this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1];
      }

      alert("infligiste " + danio + " de daño")
    }
    else {
      if (indiceTipos.botTipo2 !== -1 && indiceTipos.botTipo2 !== -1) {
        danio = 4 * ((this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo1] * this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo2]) * (this.tablaTiposValores[indiceTipos.botTipo2][indiceTipos.jugadorTipo1] * this.tablaTiposValores[indiceTipos.botTipo2][indiceTipos.jugadorTipo2]));
      }
      else if (indiceTipos.botTipo2 !== -1 && indiceTipos.botTipo2 === -1) {
        danio = 4 * (this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo1] * this.tablaTiposValores[indiceTipos.botTipo2][indiceTipos.jugadorTipo1]);
      }
      else if (indiceTipos.botTipo2 === -1 && indiceTipos.botTipo2 !== -1) {
        danio = 4 * (this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo1] * this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo2]);
      }
      else {
        danio = 4 * this.tablaTiposValores[indiceTipos.botTipo1][indiceTipos.jugadorTipo1];
      }

      alert("te infligieron " + danio + " de daño")
    }

    return danio;
  }

  pelea(pokemonJugador: Pokemon, pokemonBot: Pokemon) {
    pokemonJugador.life = this.inicializarVidas(pokemonJugador)
    pokemonBot.life = this.inicializarVidas(pokemonBot)

    if (this.turno) {
      pokemonBot.life -= this.tablaDeTipos(this.peleador, this.peleadorBot, this.turno)
      alert(" la vida del pokemon rival es: " + pokemonBot.life)
    }
    else {
      pokemonJugador.life -= this.tablaDeTipos(this.peleador, this.peleadorBot, this.turno);
      alert(" la vida de tu pokemon es: " + pokemonJugador.life)
    }

    this.turno = !this.turno;

    if (pokemonJugador.life <= 0) {
      pokemonJugador.isAlive = false;
    }
    else if (pokemonBot.life <= 0) {
      this.peleadorBot++
      pokemonBot.isAlive = false;
    }
  }

  /*------------------------------------------------------------------------------------------------------*/
  combate() {

    let turn = 0;

    if (!this.checkStstate(this.equipoMain.equipo[this.peleador])) {
      console.log("tu pokemon esta muerto!");
      this.equipoMain = this.deletePokemon(this.equipoMain)
    } else if (!this.checkStstate(this.equipoRival.equipo[this.peleadorBot])) {
      console.log("el pokemon rival esta muerto!");
      this.equipoRival = this.deletePokemon(this.equipoRival)
    }
    else {
      while (this.checkStstate(this.equipoMain.equipo[this.peleador]) && this.checkStstate(this.equipoRival.equipo[this.peleadorBot])) {

        this.pelea(this.equipoMain.equipo[this.peleador], this.equipoRival.equipo[this.peleadorBot]);

        turn++;

        if (turn % 2 === 0) {
          break;
        }
      }
    }

    if (!this.alguienVivo(this.equipoMain) || !this.alguienVivo(this.equipoRival)) {
      this.ganador();
    }
  }

  checkStstate(pkmn: Pokemon) {
    if (pkmn !== undefined && pkmn.isAlive) {
      return true;
    } else {
      return false;
    }
  }

  alguienVivo(team: EquipoPokemon) {
    let alive = false;
    if (team.equipo !== undefined) {
      for (let i = 0; i < team.equipo.length; i++) {

        if (team.equipo[i].isAlive) {
          alive = true;
        }
        else {
          this.deletePokemon(team);
        }
      }
      return alive;
    }
    else {
      return alive
    }
  }

  ganador() {

    console.log("hola");
    console.log(this.equipoMain);

    if (this.equipoMain.equipo.length === 0) {
      alert("perdiste");

      //el alert deberia tener un aceptar para volver al menu principal, preguntarle a nico como hacerlo
      this.toMainMenu()
    }
    else if (this.equipoMain.equipo.length === 0) {
      alert("Ganaste el combate!");

      /* agregar un this.usuario.combatesGanados+=1 */
      //igual que el de arriba
      this.toMainMenu()
    }
  }

  inicializarVidas(pokemonto: Pokemon) {
    if (!pokemonto.life) {
      return 64;
    }
    else {
      return pokemonto.life
    }
  }

  gotoSlector() {
    this.service.EquipoSeleccionado(this.equipoMain);
    this.service.EquipoSeleccionadoBot(this.equipoRival);
    this.router.navigate(['/cambiar-pokemon']);
  }
}
