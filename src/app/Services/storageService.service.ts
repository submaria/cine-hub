import { HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

import { LoginInterface } from './../Pages/login/Interface/login.interface';
import { ControllService } from './controller.service';

//StorageService
const API = environment.api;
const DARKMODE = 'theme';

//LOGIN
const USER = 'session';
const ERROR_LOG = 'log';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private controller: ControllService
  ) {
    this.storage.create();
  };

  async setDarkMode(bool: boolean) {
    await this.storage.set(DARKMODE, bool);
  };

  async getDarkMode() {
    return await this.storage.get(DARKMODE);
  };

  async setUser(user: LoginInterface): Promise<LoginInterface> {
    return await this.storage.set(USER, user);
  };

  async getUser(): Promise<LoginInterface> {
    const user = await this.storage.get(USER);
    if (user === null) {
      return {
        codigoUsuario: 0,
        usuario: '',
        token: '',
        expireToken: '',
      };
    };

    return user;
  };

  async setErrorLogToken(value: HttpErrorResponse) {
    await this.getErrorLogToken().then(async (res) => {
      res.push({
        type: HttpEventType.ResponseHeader,
        headers: new HttpHeaders(),
        error: {
          isTrusted: value.error.isTrusted,
          bubbles: value.error.bubbles,
          cancelBubble: value.error.cancelBubble,
          cancelable: value.error.cancelable,
          composed: value.error.composed,
          defaultPrevented: value.error.defaultPrevented,
          eventPhase: value.error.eventPhase,
          lengthComputable: value.error.lengthComputable,
          loaded: value.error.loaded,
          returnValue: value.error.returnValue,
          timeStamp: value.error.timeStamp,
          total: value.error.total,
          type: value.error.type,
        },
        message: value.message,
        name: value.name,
        ok: value.ok,
        status: value.status,
        statusText: value.statusText,
        url: value.url
      });

      await this.storage.set(ERROR_LOG, res);
    });
  };

  async getErrorLogToken(): Promise<HttpErrorResponse[]> {
    const log: HttpErrorResponse[] = await this.storage.get(ERROR_LOG).then(x => {
      if (x === null) {
        return [];
      };
      return x;
    });

    return log;
  };

  removeErrorLog() {
    this.storage.remove(ERROR_LOG);
  };

  logout() {
    this.storage.remove(USER);
    this.controller.navigateLogin();
  };
};
