import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route } from '@angular/router';

import { AuthService } from '../authentication/auth-service.service';
import { ControllService } from './../controller.service';
import { StorageService } from './../storageService.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private service: StorageService,
    private auth: AuthService,
    private controller: ControllService
  ) {}

  async canActivate() {
    return await this.verificarAcesso();
  };

  async canLoad(route: Route) {
    return await this.verificarAcesso();
  };

  private async verificarAcesso() {
    if (
      (await this.service.getUser().then((res) => res.token)) &&
      (await this.auth.validateToken().then((retorno) => retorno))
    ) {
      return true;
    } else {
      this.controller.navigateLogin();
      return false;
    }
  };
}
