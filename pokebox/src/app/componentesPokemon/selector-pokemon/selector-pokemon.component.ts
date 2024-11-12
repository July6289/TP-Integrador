import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './selector-pokemon.component.html',
  styleUrl: './selector-pokemon.component.css'
})
export class SelectorPokemonComponent {

  constructor(private routes: Router){}

  gotoCombate()
  {
    this.routes.navigate(['/combate']);
  }

  seleccionar(){
    
  }

}
