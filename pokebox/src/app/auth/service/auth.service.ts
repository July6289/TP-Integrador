import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estoyLogeado: boolean = false;
  idDelUsuario: string = '';



  getTokenValue() {
    return localStorage.getItem('token');
  }

  logIn() {
    this.estoyLogeado = true;
  }
  logOut() {
    this.estoyLogeado = false;
  }

}
