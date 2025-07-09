import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const authGuardFnLogout = () => {
  const router = inject(Router);

  if (!localStorage.getItem('token')) {
    return true
  } else {
    router.navigateByUrl('main-page');
    return false;
  }
}
