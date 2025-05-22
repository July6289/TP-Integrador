import { Component, EventEmitter, importProvidersFrom, inject, OnInit, Output } from '@angular/core';
import { ListaPokemonComponent } from "../lista-pokemon/lista-pokemon.component";
import { CommonModule } from '@angular/common';
import { EquipoPokemonService } from '../../pokeservices/equiposervices.service';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { EquipoPokemon } from '../../interfaces/interfazpokemon/interfazEquipo.interface';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { UsuarioService } from '../../pokeservices/usuario.service';

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
    box: [],
    Email: "",
    Password: "",
    CombatesGanados: 0,
    ListaFavoritos: [],
    ListaObjetos: [],
    ListaEquipos: []
  }
  posicion: number = 0;
  posicion2:number= 0;
  pokeservice = inject(PokeservicesService)
  usuarioService=inject(UsuarioService)
  secretId: string | null = ""
  constructor(private equipoPokemonService: EquipoPokemonService, private router: Router) { }
  ngOnInit(): void {

    this.dbUsuarioId
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

          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco

          //la forma definitiva de evitar el undefined
            this.usuario.box = valor.box.map((caja, index) => ({
  imagen: caja.imagen || `/assets/imagenes/cajas/${index + 1}.png`,
  pokemones: [...(caja.pokemones || [])] // clon defensivo y protección
}));
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

  pickPokemon(pokemon: Pokemon) {
    console.log('Seleccionaste el Pokémon:', pokemon); // Manejo de la selección
    // Aquí puedes añadir la lógica que necesites para manejar el Pokémon seleccionado
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
}


