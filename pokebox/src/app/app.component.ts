import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideHttpClient} from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TutorialComponent } from './componentesPokemon/tutorial/tutorial.component';
import { Subscription } from 'rxjs';
import { TutorialService } from './pokeservices/tutorial.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,NavbarComponent, TutorialComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy  {

  showNavbar: boolean = true;
  showNavbar2:boolean=true;

  mostrarTutorial = false;
  private sub?: Subscription;

  constructor(private router: Router, private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Aquí detectamos si estamos en una ruta en la que no queremos mostrar el Navbar
      const currentRoute = this.router.url;
      this.showNavbar =!currentRoute.includes('registro')// Ejemplo de ruta para no mostrar el navbar
      this.showNavbar2=!currentRoute.includes('cambiar-contra');


    });
    this.sub = this.tutorialService.mostrarTutorial$.subscribe(
      mostrar => this.mostrarTutorial = mostrar
    );
  }

  cerrarTutorial() {
    this.tutorialService.ocultarTutorial();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}


