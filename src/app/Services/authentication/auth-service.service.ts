import { EventEmitter, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { differenceInSeconds, parseISO } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { LoginInterface } from 'src/app/Pages/login/Interface/login.interface';

import { StorageService } from '../storageService.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loadingBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public authState = new BehaviorSubject(false);
  emitUser = new EventEmitter<LoginInterface>();
  constructor(private service: StorageService,
              private platform: Platform) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  async validateToken() {
    const newDate = new Date();
    const expireDate = new Date(
      parseISO(await this.service.getUser().then((x) => x.expireToken))
    );

    if (differenceInSeconds(newDate, expireDate) <= 0) {
      return true;
    }

    return false;
  };

  async ifLoggedIn() {
    await this.service.getUser().then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  };
}
