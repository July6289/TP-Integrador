import { Component } from '@angular/core';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'pagina-principal',
  standalone: true,
  imports: [PerfilComponent],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

}
