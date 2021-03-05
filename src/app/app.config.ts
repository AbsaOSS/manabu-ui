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
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { IAppConfig } from './models/app-config.model';

@Injectable()
export class AppConfig {
  static settings: IAppConfig;
  private jsonFile = '/config.json';

  constructor(private http: Http) {
    if (!environment.production) {
      this.jsonFile = 'assets/config/config.dev.json';
    }

    if (window['USE_MOCK_DATA']) {
      this.jsonFile = 'assets/config/config.dev.mock.json';
    }
  }

  load() {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(this.jsonFile)
        .toPromise()
        .then((response: Response) => {
          AppConfig.settings = <IAppConfig>response.json();
          resolve();
        })
        .catch((response: any) => {
          reject(`Could not load file '${this.jsonFile}': ${JSON.stringify(response)}`);
        });
    });
  }
}
