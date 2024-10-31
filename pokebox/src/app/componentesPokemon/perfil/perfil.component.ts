import { Component } from '@angular/core';
import { PaginaPrincipalComponent } from "../pagina-principal/pagina-principal.component";

@Component({
  selector: 'perfil',
  standalone: true,
  imports: [PaginaPrincipalComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
