/*
 * Copyright 2020 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
