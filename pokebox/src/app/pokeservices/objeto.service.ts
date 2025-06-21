import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { Objeto } from '../interfaces/objetos/objeto.interface';
import { Usuario } from '../interfaces/interfaz-usuario/Usuario.interface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})

export class ObjetoService {
  private urlbase: string = 'http://localhost:3001/Objetos';
  private inventarioSubject = new BehaviorSubject<{ objeto: Objeto, cantidad: number }[]>([]);
  inventario$ = this.inventarioSubject.asObservable();
  usuario: Usuario = {
    id: "",
    Email: "",
    Username: "",
    Password: "",
    UrlImagenPerfil: '',
    CombatesGanados: 0,
    box: [],
    ListaFavoritos: [],
    ListaEquipos: [],
    ListaObjetos: []
  };
  clave: string | null = "";
  usuarioService = inject(UsuarioService);
  private objetoSeleccionadoSubject = new BehaviorSubject<Objeto | null>(null);
  objetoSeleccionado$ = this.objetoSeleccionadoSubject.asObservable();

  constructor(private service: HttpClient) { }

  private syncUsuario(modificar: (usuario: Usuario) => void): Observable<Usuario> {
    this.getid();
    return this.usuarioService.getUsuarioById(this.clave!).pipe(
      tap(usuario => modificar(usuario)),
      switchMap(usuario => this.usuarioService.putUsuario(usuario, this.clave!))
    );
  }

  public setInventario(objetos: Objeto[]) {
    const nuevoInventario = objetos.map(obj => ({
      objeto: obj,
      cantidad: obj.cantidad
    }))
    this.inventarioSubject.next(nuevoInventario)
  }

  getid() {
    this.clave = localStorage.getItem('token')
  }

  normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')           // Descompone letras con tildes
      .replace(/[\u0300-\u036f]/g, ''); // Elimina marcas diacríticas (tildes)
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
    this.syncUsuario(usuario => {
      this.usuario = usuario;

      if (existe) {
        if (existe.cantidad < 99) {
          existe.cantidad += cantidad;
          const index = usuario.ListaObjetos.findIndex(e => e.nombre === objeto.nombre);

          if (index !== -1) {
            usuario.ListaObjetos[index].cantidad += cantidad;
          } else {
            usuario.ListaObjetos.push({ ...objeto, cantidad });
          }
        } else {
          alert('Solo puedes llevar hasta 99 unidades del mismo objeto');
        }
      } else {
        actual.push({ objeto, cantidad });
        const yaExiste = usuario.ListaObjetos.find(e => e.nombre === objeto.nombre);

        if (!yaExiste) {
          usuario.ListaObjetos.push({ ...objeto, cantidad });
        }
      }

      this.inventarioSubject.next([...actual]);
    }).subscribe({
      next: () => console.log('Objeto agregado y sincronizado exitosamente.'),
      error: (e: Error) => console.error('Error al sincronizar:', e.message)
    });
  }

  eliminarObjeto(nombre: string) {
    const actual = this.inventarioSubject.getValue();
    const actualizado = actual.filter(item => item.objeto.nombre !== nombre);
    this.inventarioSubject.next(actualizado);
    this.syncUsuario(usuario => {
      this.usuario = usuario;
      usuario.ListaObjetos = usuario.ListaObjetos.filter(e => e.nombre !== nombre);
    }).subscribe({
      next: () => console.log('Objeto eliminado y sincronizado.'),
      error: (e: Error) => console.error('Error al eliminar objeto:', e.message)
    });
  }


cambiarCantidad(nombre: string, nuevaCantidad: number) {
  const actual = this.inventarioSubject.getValue();
  // Creamos un nuevo array inmutable con cantidades actualizadas
  const actualizado = actual.map(item => {
    if (item.objeto.nombre === nombre) {
      return {
        ...item, // Copiamos el objeto
        cantidad: nuevaCantidad // Reemplazamos la cantidad
      };
    }

    return item;
  });

  this.inventarioSubject.next(actualizado); // Emitimos copia modificada
  this.syncUsuario(usuario => {
    this.usuario = usuario;
    const index = usuario.ListaObjetos.findIndex(e => e.nombre === nombre);

    if (index !== -1) {
      usuario.ListaObjetos[index] = {
        ...usuario.ListaObjetos[index],
        cantidad: nuevaCantidad
      };
    }
  }).subscribe({
    next: () => console.log('Cantidad actualizada y sincronizada.'),
    error: (e: Error) => console.error('Error al sincronizar:', e.message)
  });
}

  seleccionarObjeto(objeto: Objeto) {
    this.objetoSeleccionadoSubject.next(objeto);
  }
}
