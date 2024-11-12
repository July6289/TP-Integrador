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

  pokemonTeam: Pokemon[] = [];

  constructor(private service: EquipoPokemonService, private pokeservicesService: PokeservicesService, private router: Router) { }

  private tablaTiposNombres: string[] = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"]

  ngOnInit(): void {
    this.equipoMain = this.service.recibirEquipoPokemon();

    this.pokeservicesService.getRandomPokemonTeam().subscribe(team => {
      this.pokemonTeam = team;
      this.equipoRival =
      {
        nombre: "Rival",
        equipo: this.pokemonTeam
      }
    });

  }

  clicTest() {
    console.log(this.equipoMain);
    console.log(this.equipoRival);
  }

  toMainMenu() {
    this.router.navigate(['/**']);
  }

  tablaDeTipos(pokemonJugador: Pokemon, pokemonBot: Pokemon, turno: boolean) {
    console.log(pokemonJugador.name);
    console.log(pokemonBot.name);
    
    
    let danio = 0;
    let indiceTipos = {
      jugadorTipo1: -1,
      jugadorTipo2: -1,
      botTipo1: -1,
      botTipo2: -1
    }

    //buscar indice tipos tipos
    for (let i = 0; i < this.tablaTiposNombres.length; i++) {
      if (pokemonJugador.types[0].type.name === this.tablaTiposNombres[i]) {
        indiceTipos.jugadorTipo1 = i;
      }

      if (pokemonJugador.types[1] && pokemonJugador.types[1].type.name === this.tablaTiposNombres[i]) {
        indiceTipos.jugadorTipo2 = i;
      }

      if (pokemonBot.types[0].type.name === this.tablaTiposNombres[i]) {
        indiceTipos.botTipo1 = i;
      }

      if (pokemonBot.types[1] && pokemonBot.types[1].type.name === this.tablaTiposNombres[i]) {
        indiceTipos.botTipo2 = i;
      }
    }
    /*---------------------*/

    //calculadora de daño
    if (turno) {

      //los pokemon van a tener 64 de vida

      if (indiceTipos.jugadorTipo2 !== -1 && indiceTipos.botTipo2 !== -1) {
        danio = 4 * ((this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo2]) * (this.tablaTiposValores[indiceTipos.jugadorTipo2][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo2][indiceTipos.botTipo2]));
      }
      else if (indiceTipos.jugadorTipo2 !== -1 && indiceTipos.botTipo2 === -1) {
        danio = 4 * (this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo2][indiceTipos.botTipo1]);
      }
      else if (indiceTipos.jugadorTipo2 === -1 && indiceTipos.botTipo2 !== -1) {
        danio = 4 * (this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1] * this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo2]);

        console.log(indiceTipos.jugadorTipo1);
        console.log(indiceTipos.botTipo1);
        console.log(indiceTipos.botTipo2);

        console.log("enemigo 2 elementos");

      }
      else {
        danio = 4 * this.tablaTiposValores[indiceTipos.jugadorTipo1][indiceTipos.botTipo1];
        console.log(indiceTipos.jugadorTipo1);
        console.log(indiceTipos.botTipo1);
        console.log("ambos 1 elemento");

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

    console.log("el daño es " + danio);
  }

  gotoSlector()
  {
    this.router.navigate(['/cambiar-pokemon']);
  }
}
