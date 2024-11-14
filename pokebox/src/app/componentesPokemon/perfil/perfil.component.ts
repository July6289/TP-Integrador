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
  ngOnInit(): void {
    this.dbUsuarioId(this.datosDelId);
  }

auth=inject(AuthService);
usarioServicio=inject(UsuarioService);
usuario:Usuario= {id: "cce1",
box: [],
Username: "rodolfo",
Password: ""

}
datosDelId:string|undefined=this.auth.idDelUsuario;
dbUsuarioId(id:string|undefined){
  this.usarioServicio.getUsuarioById(this.datosDelId).subscribe(
  {
    next:(valor:Usuario)=>{
      this.usuario=valor;
    },
    error:(e:Error)=>{
      console.log(e.message);


    }



  }
  )
}

}
