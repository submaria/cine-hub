import { Validators } from '@angular/forms';

export class FormSearchInterface {
  public nome = ['', [Validators.required]];
  public sobrenome = ['', [Validators.required]];
}
