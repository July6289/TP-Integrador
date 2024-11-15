import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estoyLogeado:boolean=false;
  idDelUsuario:string|undefined='';
  private valueSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  guardarProgreso=this.valueSubject.asObservable();

  setValue(newValue: boolean): void {
    this.valueSubject.next(newValue);  // Cambia el valor y emite el cambio
  }

  logIn(){
    this.estoyLogeado=true;
  }
  logOut(){
    this.estoyLogeado=false;
  }

}
