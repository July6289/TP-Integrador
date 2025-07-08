import { inject, Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, getAuth, GoogleAuthProvider, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail } from 'firebase/auth'
import { Usuario } from '../../interfaces/interfaz-usuario/Usuario.interface';
import { UsuarioService } from '../../pokeservices/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  usuarioservice = inject(UsuarioService)
  private auth = getAuth();
  user = this.auth.currentUser;
  estoyLogeado = this.user !== null;
  equiposeleccionado: boolean = false;
  idDelUsuario: string = '';
  nombreUsuario: string = ''
  getTokenValue() {
    return localStorage.getItem('token');
  }

  equipoSelected() {
    this.equiposeleccionado = true
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

  logIn(user: Usuario) {
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
      handleCodeInApp: false,
    };
    sendPasswordResetEmail(this.auth, email, actionCodeSettings)
      .then(() => {
        console.log('Correo de recuperación enviado.');
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error.message);
      });
  }
  enviarCorreoVerificacion() {
    const user = this.auth.currentUser;
    if (user) {
      const actionCodeSettings = {
        url: 'http://localhost:4200/usuario-verificado',
        handleCodeInApp: false
      };
      return sendEmailVerification(user, actionCodeSettings);
    } else {
      return Promise.reject('No hay usuario autenticado para enviar verificación.');
    }
  }


  async intentarLoguearORegistrar(usuario: Usuario) {
    try {
      await this.logIn(usuario);
      console.log('Logueado');
    } catch (error) {
      console.log('Fallo login, registrando...');
      try {//no, no existe, bueno lo registramos
        await this.register(usuario);
        console.log('Registrado');
      } catch (e) {
        console.error('Fallo el registro también');
      }//no en realidad ya existe, bueno lo borramos y creamos denuevo

    }
  }


  isAuthenticated(): boolean {
    const user = this.auth.currentUser;
    return user !== null;
  }

}
