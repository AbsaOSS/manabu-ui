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
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppConfig } from '../app.config';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class KeycloakTokenInterceptor implements HttpInterceptor {
  protected envName = AppConfig.settings.env.name;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (KeycloakService.isTokenExpired()) {
      KeycloakService.refreshUserToken();
      return this.handleRequest(request, next);
    } else {
      return this.handleRequest(request, next);
    }
  }

  handleRequest(request: HttpRequest<any>, next: HttpHandler) {
    request = this.addAuthToken(request);
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this.getCaughtError(request, error)));
  }

  addAuthToken(request) {
    if (request.headers.get('Authorization') === null) {
      const authToken = KeycloakService.getToken() || '';

      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + authToken }
      });
    }
    return request;
  }

  getCaughtError(request: HttpRequest<any>, error: HttpErrorResponse) {
    return throwError(error);
  }
}
