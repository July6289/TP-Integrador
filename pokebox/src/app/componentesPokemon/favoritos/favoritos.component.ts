import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeservicesService } from '../../pokeservices/pokemon.service';
import { Pokemon } from '../../interfaces/interfazpokemon/Pokemon.inteface';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../pokeservices/usuario.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  favoritos$: Observable<Pokemon[]>;
  usarioServicio = inject(UsuarioService);
  contextMenuVisible = false;
  contextMenuX = 0;
  contextMenuY = 0;
  selectedPokemon: Pokemon | null = null;

  constructor(private pokeService: PokeservicesService) {
    this.favoritos$ = this.pokeService.favoritos$;
  }

  onRightClick(event: MouseEvent, pokemon: Pokemon) {
    event.preventDefault();
    this.selectedPokemon = pokemon;
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.contextMenuVisible = true;
  }

  eliminarFavorito() {
    if (this.selectedPokemon) {
      const confirmado = confirm(`¿Estás seguro que deseas eliminar a ${this.selectedPokemon.name} de favoritos?`);

      if (confirmado) {
        this.pokeService.eliminarFavorito(this.selectedPokemon.id);
        this.selectedPokemon = null;
      }
    }

    this.contextMenuVisible = false;
  }


  @HostListener('document:click')
  closeContextMenu() {
    this.contextMenuVisible = false;
  }

  getSpriteUrl(pokemon: Pokemon): string {
    if (pokemon.isMale && pokemon.isShiny) return pokemon.sprites.front_shiny;
    if (pokemon.isMale && !pokemon.isShiny) return pokemon.sprites.front_default;
    if (!pokemon.isMale && pokemon.isShiny) return pokemon.sprites.front_shiny_female || pokemon.sprites.front_shiny;
    if (!pokemon.isMale && !pokemon.isShiny) return pokemon.sprites.front_female || pokemon.sprites.front_default;
    return pokemon.sprites.front_default;
  }
}
