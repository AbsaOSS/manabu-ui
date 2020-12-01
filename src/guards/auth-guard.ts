import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Role } from 'src/app/models/Role';

@Injectable()
export class ManabuAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAccessAllowed(route, state);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      KeycloakService.getObservableUser().subscribe(
        (user) => {
          if (user.roles.includes(Role.User)) {
            if (route.data && route.data.title === 'Admin Home') {
              this.router.navigate(['user/course']);
            }
          }
          observer.next(true);
          observer.complete();
        },
        (error) => {
          // not logged in so:
          // - clear the sessions
          KeycloakService.logout();
          // - redirect to login page with the return url
          this.router.navigate(['/'], {
            queryParams: { returnUrl: state.url }
          });
          // - return false
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
}
