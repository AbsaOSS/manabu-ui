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
import * as Keycloak from 'keycloak-js';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Role } from '../models/Role';

@Injectable()
export class KeycloakService {
  constructor() {}
  static _user: User | undefined;
  static keycloakAuth: any = !environment.production
    ? Keycloak('../assets/keycloak/keycloak.json')
    : Keycloak('/keycloak.json');

  //Creating subject to notify other services when logout event occurs
  static _onlogoutEvent = new BehaviorSubject<User>(undefined);
  static onLogoutListener$ = KeycloakService._onlogoutEvent.asObservable();

  static init(): Promise<any> {
    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuth
        .init({ onLoad: 'login-required', checkLoginIframe: false })
        .success(() => {
          KeycloakService.afterLogin();
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  static afterLogin(): void {
    KeycloakService.keycloakAuth.loadUserProfile().success((data: any) => {
      KeycloakService._user = {
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        roles: KeycloakService.getUserRoles(),
        attributes: data.attributes || {}
      };
    });
  }

  static logout() {
    this._onlogoutEvent.next(KeycloakService._user);
    KeycloakService.resetSession();
    KeycloakService.keycloakAuth.logout({ redirectUri: document.baseURI });
  }

  static isTokenExpired(minValidity?: number) {
    return KeycloakService.keycloakAuth.isTokenExpired(150);
  }

  static resetSession(): void {
    KeycloakService._user = undefined;
    KeycloakService.keycloakAuth.clearToken();
    let filterState = window.localStorage.getItem('filterState');
    window.localStorage.clear();
    window.localStorage.setItem('filterState', filterState);
    window.sessionStorage.clear();
  }

  static getToken(): Promise<any> {
    return KeycloakService.keycloakAuth.token;
  }

  static refreshUserToken() {
    return new Promise(async (resolve, reject) => {
      KeycloakService.keycloakAuth
        .updateToken(2000)
        .success(() => {
          resolve();
        })
        .error(() => reject('Failed to refresh user session token'));
    });
  }

  static getUser(): User {
    return KeycloakService._user;
  }

  static getLogoutListener(): Observable<User> {
    return this.onLogoutListener$;
  }

  static getUserRoles(): string[] {
    if (KeycloakService.keycloakAuth.realmAccess) {
      return KeycloakService.keycloakAuth.realmAccess.roles ? KeycloakService.keycloakAuth.realmAccess.roles : [''];
    }
    return [];
  }

  static register(options: Keycloak.KeycloakLoginOptions = { action: 'register' }): Promise<void> {
    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuth
        .register(options)
        .success(() => {
          resolve();
        })
        .error(() => reject('An error happened during the register execution.'));
    });
  }

  static isAdminUser(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (this._user !== undefined) {
        if (this._user.roles.includes(Role.Admin)) {
          observer.next(true);
          observer.complete();
        }
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  /**
   * Get the user after it will be loggedin.
   * @param waitTime Time to timeout
   */
  static getObservableUser(waitTime = 5000): Observable<User> {
    if (KeycloakService._user) {
      return new Observable((observer) => {
        observer.next(KeycloakService._user);
        observer.complete();
      });
    } else {
      let t = timer(0, 100);
      return new Observable((observer) => {
        let tt = t.subscribe((time) => {
          if (time > waitTime) {
            tt.unsubscribe();
            observer.next(null);
            observer.complete();
          }
          if (KeycloakService._user) {
            tt.unsubscribe();
            observer.next(KeycloakService._user);
            observer.complete();
          }
        });
      });
    }
    return new Observable();
  }

  static getUserAccessPermissions() {
    let role;
    let roles = KeycloakService.keycloakAuth.realmAccess.roles;

    if (roles.includes(Role.User)) {
      role = Role.User;
    } else if (roles.includes(Role.Admin)) {
      role = Role.Admin;
    } else {
      role = Role.Super;
    }

    return role;
  }
}
