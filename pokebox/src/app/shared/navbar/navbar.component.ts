import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
      if(localStorage.getItem('token'))
      {
        this.textButton='Cerrar Sesion'
      }
  }

textButton:string='Iniciar Sesion'
auth=inject(AuthService);

localizador=inject(Location);

Router= inject(Router);

goToPerfil() {
  this.Router.navigate(['/perfil']);
}
onLonginLogout(){
  if(this.textButton==='Iniciar Sesion'){
    this.textButton='Cerrar Sesion'
    this.auth.logIn('')
    this.Router.navigateByUrl('registro');
  }else{
    this.auth.logOut()
    this.textButton='Iniciar Sesion'
    this.Router.navigateByUrl('registro');
    localStorage.clear();
  }
  }


}
