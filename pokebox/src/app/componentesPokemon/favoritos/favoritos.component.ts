import { Component, OnInit } from '@angular/core';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Pokemon } from '../../interfaces/interfazpokemon/interfazpokemon.inteface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos$: Observable<Pokemon[]>;

  constructor(private pokeService: PokeservicesService) {
    this.favoritos$ = this.pokeService.favoritos$;
  }

  ngOnInit(): void {}
}

