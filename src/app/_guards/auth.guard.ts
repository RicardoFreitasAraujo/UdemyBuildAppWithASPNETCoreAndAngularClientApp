import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertaService } from '../_services/alerta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, 
              private route: Router, 
              private alerta: AlertaService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
     if(this.authService.loggedIn()) {
      return true;
     }

     this.alerta.error('You shall not pass!!!');
     this.route.navigate(['/home']);
     return false;
  }
}
