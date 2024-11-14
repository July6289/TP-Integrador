import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estoyLogeado:boolean=false;


  logIn(){
    this.estoyLogeado=true;


  }
  logOut(){
    this.estoyLogeado=false;
  }

}
