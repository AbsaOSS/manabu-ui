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
