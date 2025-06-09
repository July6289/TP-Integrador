import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TutorialComponent } from './componentesPokemon/tutorial/tutorial.component';
import { filter, Subscription } from 'rxjs';
import { TutorialService } from './pokeservices/tutorial.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, TutorialComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  showNavbar: boolean = true;
  showNavbar2: boolean = true;

  mostrarTutorial = false;
  private sub?: Subscription;

  constructor(private router: Router, private tutorialService: TutorialService) { }

  ngOnInit(): void {
   this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe(() => {
    const rutasSinNavbar = ['registro', 'cambiar-contra'];
    this.showNavbar = !rutasSinNavbar.some(ruta => this.router.url.includes(ruta));
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
