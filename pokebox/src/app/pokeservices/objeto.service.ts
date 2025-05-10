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


  normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')           // Descompone letras con tildes
      .replace(/[\u0300-\u036f]/g, ''); // Elimina marcas diacríticas (tildes)
  }


  getItemByName(NombreItem: string):Observable<Objeto|undefined>{
    const nombreNormalizado=this.normalizarTexto(NombreItem)
  return this.service.get<Objeto[]>(this.urlbase).pipe(
    map(items=>
      items.find(items=>
        this.normalizarTexto(items.nombre)===nombreNormalizado))    //una forma mas comoda de devolver solo un objeto, de toda manera si no existe dara undefined
  )
  }

  getItemsByPartialName(partialName: string): Observable<Objeto[]> {
  const nombreNormalizado = this.normalizarTexto(partialName);
  return this.service.get<Objeto[]>(this.urlbase).pipe(
    map(items =>
      items.filter(item =>
        this.normalizarTexto(item.nombre).includes(nombreNormalizado)
      )
    )
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

  eliminarObjeto(nombre: string) {
    const actual = this.inventarioSubject.getValue();
    const actualizado = actual.filter(item => item.objeto.nombre !== nombre);
    this.inventarioSubject.next(actualizado);
  }

  cambiarCantidad(nombre: string, nuevaCantidad: number) {
    const actual = this.inventarioSubject.getValue();
    const objeto = actual.find(item => item.objeto.nombre === nombre);
    if (objeto) {
      objeto.cantidad = nuevaCantidad;
      this.inventarioSubject.next([...actual]);
    }
  }
}
