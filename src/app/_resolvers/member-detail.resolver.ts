import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertaService } from '../_services/alerta.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<User>  {
  
  constructor(private userService: UserService,
    private router: Router,
    private alerta: AlertaService) { 
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    return this.userService.getUser(route.params['id'])
        .pipe(
          catchError(error => {
            this.alerta.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return of(null);
          })
        );
  }

  
}
