import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Objeto } from '../../../interfaces/objetos/objeto.interface';
import { ObjetoService } from '../../../pokeservices/objeto.service';

@Component({
  selector: 'app-buscador-objeto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador-objeto.component.html',
  styleUrl: './buscador-objeto.component.css'
})
export class BuscadorObjetoComponent implements OnInit {

nombreObjeto:string=''
ngOnInit(): void {
 this.nombreObjeto=''
}
servicioObjeto=inject(ObjetoService)

objeto:Objeto={
  nombre:'',
  descripcion:'',
  generacion:0,
  sprite:'',
}

buscarObjeto(){
  console.log("estoy aca")
  if(this.nombreObjeto.length>0){
    console.log(this.nombreObjeto)
    this.servicioObjeto.getItemByName(this.nombreObjeto).subscribe(
    {
      next:(objeto:Objeto|undefined)=>{
        if(objeto)
        {
          console.log(objeto)
          this.objeto.nombre=objeto.nombre

          this.objeto.descripcion=objeto.descripcion

          this.objeto.generacion=objeto.generacion

          this.objeto.sprite=objeto.sprite

        }
        else
        {
          alert('ese nombre no existe');

        }
      }
    }
    )

  }
  else
  {
    alert('no ingreso nada');

  }



}







}
