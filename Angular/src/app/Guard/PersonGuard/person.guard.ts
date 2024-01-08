import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../Service/AuthService/auth.service';
import {inject} from "@angular/core";

export const personGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  return authService.isPersonLogged()
};
