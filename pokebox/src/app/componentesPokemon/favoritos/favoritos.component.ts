import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})

export class FavoritosComponent {
  favoritos$: Observable<Pokemon[]>;

  constructor(private pokeService: PokeservicesService) {
    this.favoritos$ = this.pokeService.favoritos$;
  }
}
