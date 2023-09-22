import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ControllService {
  handlerMessage = '';
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private lodCtrl: LoadingController
  ) {}

  navigate(nav: string) {
    this.navCtrl.navigateRoot([nav]);
  };

  navigateLogin() {
    this.navCtrl.navigateRoot(['/login']);
  };

  navigateHome() {
    this.navCtrl.navigateRoot(['/home']);
  };

  async toastControllerTop(sMsg: string, nDuration: number = 1500) {
    const toast = await this.toastCtrl.create({
      message: sMsg,
      duration: nDuration,
      position: 'top',
    });
    toast.present();
  };

  async toastControllerBottom(sMsg: string, nDuration: number = 1500) {
    const toast = await this.toastCtrl.create({
      message: sMsg,
      duration: nDuration,
      position: 'bottom',
    });
    toast.present();
  };

  async alert(alertOpts: AlertOptions) {
    const alert = await this.alertCtrl.create(alertOpts);
    return await alert.present();
  };

  async loadingController(mensagem: string) {
    const loading = await this.lodCtrl.create({
      cssClass: 'my-custom-class',
      message: mensagem,
    });
    await loading.present();

    return loading;
  };

  async loadingFullController(mensagem?: string) {
    const loading = await this.lodCtrl.create({
      cssClass: 'loadingFull',
      message: mensagem,
    });
    await loading.present();

    return loading;
  };

  focusButton(id: string) {
    const btn = document.getElementById(id);
    setTimeout(() => {
      btn.focus();
    }, 100);
  };
}
