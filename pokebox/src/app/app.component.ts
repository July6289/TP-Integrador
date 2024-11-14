import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './auth/service/auth.service';
import { filter } from 'lodash';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent   {

  showNavbar: boolean = true;


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Aquí detectamos si estamos en una ruta en la que no queremos mostrar el Navbar
      const currentRoute = this.router.url;
      this.showNavbar = !currentRoute.includes('registro'); // Ejemplo de ruta para no mostrar el navbar
    });
  }
}


