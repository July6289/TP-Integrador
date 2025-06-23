import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';



export const authGuardFnCombat=()=>{
  const authService=inject(AuthService)
  const router= inject(Router)
  if(authService.equiposeleccionado)
  {
      return true
  }
  else
  {
    router.navigateByUrl('selector')

    return false
  }
}
