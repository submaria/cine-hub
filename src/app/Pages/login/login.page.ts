import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { FormLoginInterface, ResultLoginInterface } from 'src/app/Pages/login/Interface/login.interface';
import { AuthService } from 'src/app/Services/authentication/auth-service.service';
import { ControllService } from 'src/app/Services/controller.service';
import { HttpService } from 'src/app/Services/http.service';
import { StorageService } from 'src/app/Services/storageService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  visible = true;

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private service: StorageService,
    private controller: ControllService,
    private menuCtrl: MenuController,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group(new FormLoginInterface());
  };

  async ngOnInit() {};

  //FUNCTIONS
  async tryLogin() {
    const loader = await this.controller.loadingController('Por favor, aguarde...').then((retorno) => retorno);
    await this.http.post('login', this.loginForm.value).then(async (result: ResultLoginInterface) => {
        if (result.success) {
          await this.service.setUser(result.data);
          this.auth.authState.next(true);
          this.controller.navigateHome();
        }

        loader.dismiss();
        this.controller.toastControllerBottom(result.message);
        this.loginForm.reset();
      }).catch((err) => {
        this.controller.toastControllerBottom('Usuário ou senha incorretos!');
        loader.dismiss();
      });
  };

  eventHandler(keyCode: any) {
    if (keyCode === 13 && !this.loginForm.invalid) {
      this.tryLogin();
    }
  };

  //CONTROLS
  async ionViewWillEnter() {
    this.menuCtrl.enable(false);
  };
}
