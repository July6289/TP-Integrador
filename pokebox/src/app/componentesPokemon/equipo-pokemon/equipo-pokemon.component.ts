import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ListaPokemonComponent } from "../lista-pokemon/lista-pokemon.component";
import { CommonModule } from '@angular/common';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { Pokemon } from '../../interfaces/interfazpokemon/Pokemon.inteface';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/Equipo.interface';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/interfaz-usuario/Usuario.interface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { UsuarioService } from '../../pokeservices/usuario.service';
import { TutorialService } from '../../pokeservices/tutorial.service';

@Component({
  selector: 'app-equipo-pokemon',
  standalone: true,
  imports: [ListaPokemonComponent, CommonModule],
  templateUrl: './equipo-pokemon.component.html',
  styleUrls: ['./equipo-pokemon.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class EquipoPokemonComponent implements OnInit {
  @Output() pokemonSeleccionado = new EventEmitter<Pokemon>(); // Emisor para el Pokémon seleccionado
  @Output() equipoSeleccionado = new EventEmitter<EquipoPokemon>(); // Emisor para el Pokémon seleccionado

  pokemonesEnEquipo: Pokemon[] = []; // Arreglo para almacenar Pokémon en el equipo
  pokeaux: Pokemon[] = [];
  equipoPokemon: EquipoPokemon =
    {
      nombre: "",
      equipo: []
    }
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
  posicion: number = 0;
  posicion2: number = 0;
  pokeservice = inject(PokeservicesService)
  usuarioService = inject(UsuarioService)
  secretId: string | null = ""
  mostrarTutorial: boolean = false;

  constructor(private equipoPokemonService: EquipoPokemonService, private router: Router, private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.secretId = localStorage.getItem('token');
    this.dbUsuarioId();
    setTimeout(() => {
      if (this.usuario.ListaEquipos.length > 0) {
        this.equipoPokemonService.setEquipo(this.usuario.ListaEquipos)
      }
    }, 400);
  }

  dbUsuarioId() {
    this.usuarioService.getUsuarioById(this.secretId).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;
          this.usuario.Password = valor.Password
          this.usuario.id = valor.id
          this.usuario.CombatesGanados = valor.CombatesGanados;
          this.usuario.Username = valor.Username
          this.usuario.UrlImagenPerfil = valor.UrlImagenPerfil
          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco
          this.usuario.box = this.pokeservice.cajas
          //la forma definitiva de evitar el undefined
          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion++;
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

  goToMainPage() {
    this.router.navigate(['/**']);
  }

  seleccionarPokemon(pokemon: Pokemon) {
    if (this.pokemonesEnEquipo.length < 6) {
      this.pokeaux = [pokemon];
    } else {
      alert('No puedes agregar más de 6 Pokémon al equipo.'); // Mensaje de alerta
    }
  }

  agregarPokemon() {
    if (this.pokemonesEnEquipo.length < 6) {
      if (this.pokeaux[0] != null) {
        // Crear una copia del Pokémon y asignar un `id` único de tipo `number`
        const clonPokemon: Pokemon = {
          ...this.pokeaux[0],
          id: Date.now() + Math.floor(Math.random() * 1000) // Genera un `id` único basado en tiempo
        };

        clonPokemon.isAlive = true;
        this.pokemonesEnEquipo.push(clonPokemon);
        this.pokeaux = [];
      }
      else {
        alert('No hay ningún Pokémon seleccionado!');
      }
    }
    else {
      alert('No puedes agregar más de 6 Pokémon al equipo.');
    }
  }

  agregarPokemonDirecto(pokemon: Pokemon) {
    if (this.pokemonesEnEquipo.length < 6) {
      const clonPokemon: Pokemon = {
        ...pokemon,
        id: Date.now() + Math.floor(Math.random() * 1000),
        isAlive: true
      };
      this.pokemonesEnEquipo.push(clonPokemon);
    } else {
      alert('No puedes agregar más de 6 Pokémon al equipo.');
    }
  }

  eliminarPokemon(pokemon: Pokemon) {
    this.pokemonesEnEquipo = this.pokemonesEnEquipo.filter(p => p !== pokemon);
  }

  guardarEquipo() {
    let nombreValido = false;
    if (this.pokemonesEnEquipo.length < 6) {
      alert("Debes tener 6 Pokemon en el equipo!");
    }
    else {
      const nombre = prompt('Ponle un nombre a tu equipo!', '');

      if (nombre && nombre.length <= 20) {
        this.equipoPokemon = {
          nombre: String(nombre),
          equipo: this.pokemonesEnEquipo
        };
        this.equipoPokemonService.actualizarEquipo(this.equipoPokemon);  // Actualiza el equipo en el arreglo
        this.pokemonesEnEquipo = [];
        nombreValido = true;
      }
      else {
        alert('el nombre debe tener entre 1 y 20 caracteres!');
      }
    }
  }
}
