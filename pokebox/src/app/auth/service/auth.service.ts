import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estoyLogeado:boolean=false;
  idDelUsuario:string|undefined='';

  logIn(id:string|undefined){
    this.idDelUsuario=id;
    this.estoyLogeado=true;
    console.log("dato del usuario:",this.idDelUsuario)

  }
  logOut(){
    this.estoyLogeado=false;
  }

}
