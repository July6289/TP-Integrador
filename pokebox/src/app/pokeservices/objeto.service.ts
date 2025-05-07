import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Objeto } from '../interfaces/objetos/objeto.interface';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {


  constructor(private service:HttpClient) { }

  urlbase:string='http://localhost:3001/Objetos'



  getItemByName(NombreItem: string):Observable<Objeto|undefined>{
  return this.service.get<Objeto[]>(this.urlbase).pipe(
    map(items=> items.find(items=>items.nombre.toLowerCase()===NombreItem.toLowerCase()))    //una forma mas comoda de devolver solo un objeto, de toda manera si no existe dara undefined
  )
  }
}
