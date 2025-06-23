import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { Usuario } from '../../interfaces/interfaz-usuario/Usuario.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private auth = getAuth();
  user = this.auth.currentUser;
  estoyLogeado = this.user !== null;
  equiposeleccionado:boolean=false;
  idDelUsuario: string = '';

  getTokenValue() {
    return localStorage.getItem('token');
  }

  equipoSelected(){
    this.equiposeleccionado=true
  }

  getAuth() {
    return getAuth();
  }

  register(user: Usuario) {
    if (user.Password != null) {
      return createUserWithEmailAndPassword(this.auth, user.Email, user.Password);
    }
    else {
      throw new Error("contrasenia nula");
    }
  }

  logIn2(user: Usuario) {
    if (user.Password != null) {
      return signInWithEmailAndPassword(this.auth, user.Email, user.Password)
    }
    else {
      throw new Error("contrasenia nula");
    }
  }

  logInGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider)
  }

  logLogout() {
    return signOut(this.auth);
  }

  BorrarUsuario() {
    const user = this.auth.currentUser;

    if (user) {
      //si el usuario esta autenticado se podria borrar...o no....
      deleteUser(user)
        .then(() => {
          console.log("Usuario eliminado exitosamente.");
        })
        .catch((error) => {
          console.error("Error al eliminar usuario:", error.message);
        });
    } else {
      console.error("No hay un usuario autenticado para eliminar.");
      // Aquí puedes redirigir al inicio de sesión o mostrar un mensaje.
    }
  }

  enviarCorreoRecuperación(email: string) {
    const actionCodeSettings = {
      url: 'http://localhost:4200/cambiar-contra', // Solo la URL necesaria
    };
    sendPasswordResetEmail(this.auth, email, actionCodeSettings)
      .then(() => {
        console.log('Correo de recuperación enviado.');
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error.message);
      });
  }

  isAuthenticated(): boolean {
    const user = this.auth.currentUser;
    return user !== null;
  }
}
