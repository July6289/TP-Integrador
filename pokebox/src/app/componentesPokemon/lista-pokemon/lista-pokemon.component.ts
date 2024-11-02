import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../interfazpokemon/interfazpokemon.inteface';
import { PokeservicesService } from '../../pokeservices/pokeservices.service';
import { Generation } from '../../interfazpokemon/interfazGeneracion.interface';

@Component({
  selector: 'app-lista-pokemon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lista-pokemon.component.html',
  styleUrl: './lista-pokemon.component.css'
})
export class ListaPokemonComponent {


listaPokemon?:Pokemon[]=[];


pokeService=inject(PokeservicesService);

numeroGeneracion:number|undefined;

buscarPokemonPorGeneracion(dato:any)
{
  if(dato.target.value!==''){
      console.log(dato.target.value);
      this.pokeService.getPokemonByGeneration(dato.target.value).subscribe(
        {
          next: (respuesta:Generation|undefined)=>{

          if(respuesta!=undefined)
          {

          respuesta.pokemon_species.map((pokemonEspecie)=>{

            this.pokeService.getPokemonByName(pokemonEspecie.name).subscribe(

              {
                next: (poke: Pokemon | undefined) => {
                  if(poke!=undefined)
                  {
                    this.listaPokemon?.push(poke);
                  }

                },
                error: (err) => {
                  console.log(err);

                }
              }
            )


          })

        }



          },
          error: (e: Error) => {
            console.log(e.message)
          }
        }

      )


    }
    else{
      this.listaPokemon=[];

    }
  }

}



