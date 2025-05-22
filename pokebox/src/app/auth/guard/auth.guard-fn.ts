import { inject } from "@angular/core"
import { AuthService } from "../service/auth.service"
import { Router } from "@angular/router"

export const authGuardFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router);

  if (authService.estoyLogeado || localStorage.getItem('token')) {
    let valor = localStorage.getItem('token');
    if (valor == null) {
      valor = 'datorandom';
    }

    localStorage.setItem('token', valor)
    return true
  }
  else {
    router.navigateByUrl('access-denied');
    return false;
  }
}
