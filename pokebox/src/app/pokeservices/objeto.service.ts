// objeto.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Objeto } from '../interfaces/objetos/objeto.interface';
import { Usuario } from '../interfaces/interfaz-usuario/interfazGeneracion.interface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {
  private urlbase: string = 'http://localhost:3001/Objetos';

  constructor(private service: HttpClient) { }

  private inventarioSubject = new BehaviorSubject<{ objeto: Objeto, cantidad: number }[]>([]);
  inventario$ = this.inventarioSubject.asObservable();
  public setInventario(objetos:Objeto[])
{
  console.log(objetos)
   const nuevoInventario=objetos.map(obj=>({
    objeto:obj,
    cantidad:obj.cantidad
   }))


       this.inventarioSubject.next(nuevoInventario)

}

 usuario: Usuario = {
    id: "",
    box: [],
    Email: "",
    Password: "",
    CombatesGanados: 0,
    ListaFavoritos: [],
    ListaObjetos:[]
  }
  newObjeto:Objeto={
    nombre:'',
    descripcion:'',
    generacion:0,
    sprite:'',
    cantidad:0
  }
clave:string|null=""
 posicion: number = 0;
  posicion2: number = 0;
  posicion3:number=0;
  ready:boolean=false
  usuarioService = inject(UsuarioService);

 getid() {
    this.clave = localStorage.getItem('token')
  }

  normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')           // Descompone letras con tildes
      .replace(/[\u0300-\u036f]/g, ''); // Elimina marcas diacríticas (tildes)
  }


  getItemByName(NombreItem: string): Observable<Objeto | undefined> {
    const nombreNormalizado = this.normalizarTexto(NombreItem)
    return this.service.get<Objeto[]>(this.urlbase).pipe(
      map(items =>
        items.find(items =>
          this.normalizarTexto(items.nombre) === nombreNormalizado))    //una forma mas comoda de devolver solo un objeto, de toda manera si no existe dara undefined
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
  this.getid();

  this.usuarioService.getUsuarioById(this.clave).subscribe({
    next: (valor: Usuario) => {
      this.usuario = valor;

      // Si ya existe en el inventarioSubject
      if (existe) {
        if (existe.cantidad < 99) {
          existe.cantidad += cantidad;

          const index = this.usuario.ListaObjetos.findIndex(e => e.nombre === objeto.nombre);
          if (index !== -1) {
            this.usuario.ListaObjetos[index].cantidad += cantidad;
          } else {
            // Si no lo encuentra en ListaObjetos, lo agrega
            this.usuario.ListaObjetos.push({ ...objeto, cantidad });
          }
        } else {
          alert('Solo puedes llevar hasta 99 unidades del mismo objeto, los objetos restantes no fueron agregados');
        }
      } else {
        actual.push({ objeto, cantidad });

        const existeEnUsuario = this.usuario.ListaObjetos.find(e => e.nombre === objeto.nombre);
        if (!existeEnUsuario) {
          this.usuario.ListaObjetos.push({ ...objeto, cantidad });
        }
      }

      // Emitimos inventario actualizado
      this.inventarioSubject.next([...actual]);

      // Guardamos usuario actualizado
      this.usuarioService.putUsuario(this.usuario, this.clave).subscribe({
        next: () => console.log('Lista de objetos actualizada con éxito.'),
        error: (e: Error) => console.error('Error al guardar el usuario:', e.message),
      });
    },
    error: (e: Error) => console.error('Error al obtener el usuario:', e.message),
  });
}

  eliminarObjeto(nombre: string) {
    const actual = this.inventarioSubject.getValue();
    const actualizado = actual.filter(item => item.objeto.nombre !== nombre);
    this.inventarioSubject.next(actualizado);

    this.getid()

    this.usuarioService.getUsuarioById(this.clave).subscribe({
      next:(valor: Usuario)=>{
        this.usuario=valor

        this.usuario.ListaObjetos=this.usuario.ListaObjetos.filter(e=>e.nombre!==nombre)

        this.usuarioService.putUsuario(this.usuario, this.clave).subscribe({
          next: () => console.log('Objeto eliminado con exito.'),
          error: (e: Error) => console.error('Error al guardar el usuario:', e.message),
        });

      },
      error: (e: Error) => console.error('Error al obtener el usuario para eliminar su objeto:', e.message),
    });









  }

  cambiarCantidad(nombre: string, nuevaCantidad: number) {
    const actual = this.inventarioSubject.getValue();
    const objeto = actual.find(item => item.objeto.nombre === nombre);

    if (objeto!=undefined) {
      objeto.cantidad = nuevaCantidad;
      this.inventarioSubject.next([...actual]);

      this.getid()

       this.usuarioService.getUsuarioById(this.clave).subscribe({
      next:(valor: Usuario)=>{
        this.usuario=valor
        const index=this.usuario.ListaObjetos.findIndex(e=>e.nombre===nombre)
        this.usuario.ListaObjetos[index].cantidad=nuevaCantidad


        this.usuarioService.putUsuario(this.usuario, this.clave).subscribe({
          next: () => console.log('Lista de objetos actualizado con éxito.'),
          error: (e: Error) => console.error('Error al guardar el usuario:', e.message),
        });

      },
      error: (e: Error) => console.error('Error al obtener el usuario para actualizar su lista de objetos:', e.message),
    });
    }
  }

  private objetoSeleccionadoSubject = new BehaviorSubject<Objeto | null>(null);
  objetoSeleccionado$ = this.objetoSeleccionadoSubject.asObservable();

  seleccionarObjeto(objeto: Objeto) {
    this.objetoSeleccionadoSubject.next(objeto);
  }
}
