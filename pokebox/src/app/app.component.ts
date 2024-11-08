 import { Component} from '@angular/core';
 import { RouterOutlet } from '@angular/router';
 import { CommonModule } from '@angular/common';
 import { HttpClientModule } from '@angular/common/http';
 import { PaginaPrincipalComponent } from './componentesPokemon/pagina-principal/pagina-principal.component';

//  import ColorThief from 'colorthief';


 @Component({
   selector: 'app-root',
 standalone: true,
   imports: [RouterOutlet, CommonModule,HttpClientModule],
  templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
 })

 export class AppComponent  {
 }
