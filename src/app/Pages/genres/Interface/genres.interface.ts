import { Validators } from '@angular/forms';

export class FormGenreInterface {
  public nome = ['', [Validators.required]];
  public sobrenome = ['', [Validators.required]];
}
