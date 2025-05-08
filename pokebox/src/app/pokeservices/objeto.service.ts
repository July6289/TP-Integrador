// objeto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Objeto } from '../interfaces/objetos/objeto.interface';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {
  private urlbase: string = 'http://localhost:3001/Objetos';

  constructor(private service: HttpClient) {}

  private inventarioSubject = new BehaviorSubject<{ objeto: Objeto, cantidad: number }[]>([]);
  inventario$ = this.inventarioSubject.asObservable();

  getItemByName(NombreItem: string): Observable<Objeto | undefined> {
    return this.service.get<Objeto[]>(this.urlbase).pipe(
      map(items => items.find(items => items.nombre.toLowerCase() === NombreItem.toLowerCase()))
    );
  }

  agregarObjeto(objeto: Objeto, cantidad: number) {
    const actual = this.inventarioSubject.getValue();
    const existe = actual.find(o => o.objeto.nombre === objeto.nombre);
    if (existe) {
      existe.cantidad += cantidad;
       if(existe.cantidad >= 99)
       {
        existe.cantidad=99;
        alert('Solo puedes llevar hasta 99 unidades del mismo objeto, los objetos restantes no fueron agregados');
       }

    } else {
      actual.push({ objeto, cantidad });
    }
    this.inventarioSubject.next([...actual]);
  }
}
