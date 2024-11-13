import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pestania-combate',
  standalone: true,
  imports: [],
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

  pokemonTeam: Pokemon[] = [];

  turno: boolean = true;

  constructor(private service: EquipoPokemonService, private pokeservicesService: PokeservicesService, private router: Router) { }

  getpokemonFight() {
    this.peleador = this.service.getPosicionEquipo();
    //this.peleadorBot = this.service.getPosicionEquipo();
  }

  ngOnInit(): void {
    // Verifica compatibilidad antes de usar structuredClone
    if (typeof structuredClone === 'function') {
      this.equipoMain = structuredClone(this.service.recibirEquipoPokemon());
    } else {
      this.equipoMain = JSON.parse(JSON.stringify(this.service.recibirEquipoPokemon()));
    }

    this.pokeservicesService.getRandomPokemonTeam().subscribe(team => {
      this.pokemonTeam = team;
      console.log("equipo pokemon:" + this.pokemonTeam[0].name);

      this.equipoRival = {
        nombre: "Rival",
        equipo: this.pokemonTeam /*= structuredClone(this.pokemonTeam) || JSON.parse(JSON.stringify(this.pokemonTeam))*/
      };

      console.log("hola este es el equipo rival dentro del ngOninit:",  this.pokemonTeam);
    });

   /* for (let i = 0; i < this.equipoRival.equipo.length; i++) {
      this.equipoRival.equipo[i].isAlive = true;
    }*/

    console.log("equipo clonado: ", this.equipoMain.equipo);
    this.getpokemonFight();
    console.log("id elegido: " + this.peleador);

    console.log("equipo rival: ", this.equipoRival.equipo);
    console.log("id elegido rival: " + this.peleadorBot);
  }

  deletePokemon(equipoPerdedor: EquipoPokemon) {
    for (let i = 0; i < equipoPerdedor.equipo.length; i++) {
      if (equipoPerdedor.equipo[i].isAlive === false) {
        this.service.eliminarEquipo(i);
      }
    }
  }

  toMainMenu() {
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
    }

    return danio;
  }

  pelea(pokemonJugador: Pokemon, pokemonBot: Pokemon) {
    pokemonJugador.life = this.inicializarVidas(pokemonJugador)
    pokemonBot.life = this.inicializarVidas(pokemonBot)

    if (this.turno) {
      pokemonBot.life -= this.tablaDeTipos(this.peleador, this.peleadorBot, this.turno)
      this.turno = !this.turno;
    }
    else {
      pokemonJugador.life -= this.tablaDeTipos(this.peleador, this.peleadorBot, this.turno)
      this.turno = !this.turno;
    }

    if (pokemonJugador.life <= 0) {
      console.log("tu pokemon fue derrotado");
      pokemonJugador.isAlive = false;
      this.deletePokemon(this.equipoMain)
    }
    else if (pokemonBot.life <= 0) {
      console.log("el pokemon rival fue derrotado");
      pokemonBot.isAlive = false;
      this.deletePokemon(this.equipoRival)
    }

    this.ganador()
  }

  ganador() {
    if (this.equipoMain.equipo === null) {
      alert("perdiste el combate");

      //el alert deberia tener un aceptar para volver al menu principal, preguntarle a nico como hacerlo
      this.toMainMenu()
    }
    else if (this.equipoRival.equipo === null) {
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
    this.router.navigate(['/cambiar-pokemon']);
  }
}
