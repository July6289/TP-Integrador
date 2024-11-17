import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
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
  id: string |null =""
  usarioServicio = inject(UsuarioService);
  usuario: Usuario = {
    id: "",
    box: [],
    Username: "",
    Password: ""

  }

  ngOnInit(): void {
    this.id=localStorage.getItem('token');
    this.dbUsuarioId();
  }

  dbUsuarioId() {
    this.usarioServicio.getUsuarioById(this.id).subscribe(
      {
        next: (valor: Usuario) => {
          this.usuario.Username = valor.Username;
          this.usuario.Password = valor.Password;
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
  }

}
