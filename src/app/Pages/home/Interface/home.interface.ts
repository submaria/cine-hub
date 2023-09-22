import { Validators } from '@angular/forms';

export class FormHomeInterface {
  public nome = ['', [Validators.required]];
  public sobrenome = ['', [Validators.required]];
}
