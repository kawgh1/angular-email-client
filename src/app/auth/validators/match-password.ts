import { Injectable } from '@angular/core';
import { AbstractControl, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  validate(abstractControl: AbstractControl) {
    const { password, passwordConfirmation } = abstractControl.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  }
}
