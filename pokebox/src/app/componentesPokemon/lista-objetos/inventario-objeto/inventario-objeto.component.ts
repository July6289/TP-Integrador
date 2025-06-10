import { Component, inject, OnInit } from '@angular/core';
import { ObjetoService } from '../../../pokeservices/objeto.service';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { AuthService } from '../../../auth/service/auth.service';
import { UsuarioService } from '../../../pokeservices/usuario.service';
import { PokeservicesService } from '../../../pokeservices/pokeservices.service';

@Component({
  selector: 'app-inventario-objeto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario-objeto.component.html',
  styleUrl: './inventario-objeto.component.css'
})

export class InventarioObjetoComponent implements OnInit {
  pokeObjetos: { objeto: Objeto, cantidad: number }[] = [];
  cantidades: { [nombre: string]: number } = {};
  editandoCantidad: { [nombre: string]: boolean } = {};
  id: string | null = ''
  posicion: number = 0;
  posicion2:number=0;
  auth = inject(AuthService);
  usarioServicio = inject(UsuarioService);
  pokeservice = inject(PokeservicesService);

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

  constructor(private objetoService: ObjetoService) { }


  ngOnInit(): void {
    this.objetoService.inventario$.subscribe(data => {
      this.pokeObjetos = data;
      // Inicializamos valores por defecto en inputs
      this.cantidades = {};
      data.forEach(item => {
        this.cantidades[item.objeto.nombre] = item.cantidad;
      });
    });
    this.id = this.auth.getTokenValue();
    this.dbUsuarioId()

    setTimeout(() => {
      if (this.usuario.ListaObjetos.length > 0) {
        this.objetoService.setInventario(this.usuario.ListaObjetos)
      }
    }, 400);
  }

  cambiarCantidad(nombre: string) {
    this.editandoCantidad[nombre] = true; // Muestra el input
  }

  guardarCantidad(nombre: string) {
    const nuevaCantidad = this.cantidades[nombre];
    if (nuevaCantidad > 0 && nuevaCantidad < 100 && nuevaCantidad % 1 == 0) {
      this.objetoService.cambiarCantidad(nombre, nuevaCantidad);
      this.editandoCantidad[nombre] = false; // Oculta el input nuevamente
    } else {
      alert('Cantidad inválida');
    }
  }

  eliminar(nombre: string) {
    this.objetoService.eliminarObjeto(nombre);
  }

  seleccionarObjeto(objeto: Objeto) {
    this.objetoService.seleccionarObjeto(objeto);
  }

  dbUsuarioId() {
    this.usarioServicio.getUsuarioById(this.id).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Email = valor.Email;
          this.usuario.Password = valor.Password
          this.usuario.id = valor.id
          this.usuario.CombatesGanados = valor.CombatesGanados;
          this.usuario.Username=valor.Username

          this.usuario.UrlImagenPerfil=valor.UrlImagenPerfil
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
}
