import { inject } from "@angular/core"
import { AuthService } from "../service/auth.service"
import { Router } from "@angular/router"

export const authGuardFn=()=>{

const authService=inject(AuthService)

const router=inject(Router);
if(authService.estoyLogeado||localStorage.getItem('token'))
{
  localStorage.setItem('token','1234we8we74w8e74')
  return true
}else
{
  router.navigateByUrl('access-denied');
  return false;
}


}
