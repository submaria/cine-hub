import { Validators } from '@angular/forms';

export class FormPopularInterface {
  public nome = ['', [Validators.required]];
  public sobrenome = ['', [Validators.required]];
}
