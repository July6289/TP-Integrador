import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideHttpClient} from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {

  showNavbar: boolean = true;
  showNavbar2:boolean=true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Aquí detectamos si estamos en una ruta en la que no queremos mostrar el Navbar
      const currentRoute = this.router.url;
      this.showNavbar =!currentRoute.includes('registro')// Ejemplo de ruta para no mostrar el navbar
      this.showNavbar2=!currentRoute.includes('cambiar-contra');


    });
  }
}


