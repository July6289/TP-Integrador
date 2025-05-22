import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { Usuario } from '../../interfaces/interfaz-usuario/interfazGeneracion.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  estoyLogeado: boolean = false;
  idDelUsuario: string = '';

  //metodos mios originales
  getTokenValue() {
    return localStorage.getItem('token');
  }

  logIn() {
    this.estoyLogeado = true;
  }
  logOut() {
    this.estoyLogeado = false;
  }

  //metodos del firebase
  getAuth() {
    return getAuth();
  }

  register(user: Usuario) {
    if (user.Password != null) {
      return createUserWithEmailAndPassword(getAuth(), user.Email, user.Password);
    }
    else {
      throw new Error("contrasenia nula");
    }
  }

  logIn2(user: Usuario) {
    if (user.Password != null) {
      return signInWithEmailAndPassword(getAuth(), user.Email, user.Password)
    }
    else {
      throw new Error("contrasenia nula");
    }
  }

  logInGoogle() {
    return signInWithPopup(getAuth(), new GoogleAuthProvider)
  }

  logLogout() {
    return signOut(getAuth());
  }

  BorrarUsuario() {
    const auth = getAuth();
    const user = auth.currentUser;

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
    const auth = getAuth(); // objeto de autenticación de firebase
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log('Correo de recuperación enviado.');
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error.message);
      });
  }

  isAuthenticated(): boolean {
    const user = getAuth().currentUser;
    return user !== null;
  }
}
