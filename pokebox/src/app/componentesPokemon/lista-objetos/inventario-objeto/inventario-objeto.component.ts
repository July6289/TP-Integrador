import { Component, inject, OnInit } from '@angular/core';
import { ObjetoService } from '../../../pokeservices/objeto.service';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { AuthService } from '../../../auth/service/auth.service';
import { UsuarioService } from '../../../pokeservices/usuario.service';

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

  constructor(private objetoService: ObjetoService) {}

  editandoCantidad: { [nombre: string]: boolean } = {};


  id:string|null=''
  posicion: number = 0;
  posicion2: number = 0;
  posicion3:number=0;
  ready: boolean = false;
  ready2:boolean=false;

  auth = inject(AuthService);
  usarioServicio = inject(UsuarioService);


  usuario: Usuario = {
        id: "",
        box: [],
        Email: "",
        Password: "",
        CombatesGanados: 0,
        ListaFavoritos:[],
        ListaObjetos:[]
      }

cambiarCantidad(nombre: string) {
  this.editandoCantidad[nombre] = true; // Muestra el input
}

guardarCantidad(nombre: string) {
  const nuevaCantidad = this.cantidades[nombre];
  if (nuevaCantidad > 0 && nuevaCantidad < 100 && nuevaCantidad%1==0) {
    this.objetoService.cambiarCantidad(nombre, nuevaCantidad);
    this.editandoCantidad[nombre] = false; // Oculta el input nuevamente
  } else {
    alert('Cantidad inválida');
  }
}

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
          this.objetoService.setInventario(this.usuario.ListaObjetos)

    }, 300);



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
          //notas, la carga de usuario, nombre, contraseña funciona, la caja no carga los datos almacenados del usuario al recargar la pagina, pero no tira errores tampoco

          valor.box.map((caja) => {
            this.usuario.box[this.posicion].imagen = caja.imagen;
            this.usuario.box[this.posicion].pokemones = caja.pokemones;
            this.posicion = this.posicion + 1;
          })
          this.ready = true
          if (this.ready) {

            valor.ListaFavoritos.map((pokemon) => {
              this.usuario.ListaFavoritos[this.posicion2] = pokemon
              this.posicion2 = this.posicion2 + 1

            })


          }


               valor.ListaObjetos.map((objeto) => {
              this.usuario.ListaObjetos[this.posicion3] = objeto
              this.posicion3 = this.posicion3 + 1

            })






        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

}
