import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';

@Component({
  selector: 'perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  id: string | null = ""
  posicion:number=0;
  usarioServicio = inject(UsuarioService);
  usuario: Usuario = {
    id: "",
    box: [],
    Username: "",
    Password: "",
    CombatesGanados:0,

  }

  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    this.dbUsuarioId();
  }

 dbUsuarioId() {
    this.usarioServicio.getUsuarioById(this.id).subscribe(
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


}
