import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';

export function twoWordsValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const value = control.value;
    return new Promise<ValidationErrors | null>(resolve => {
      const delayTime = 1000;
      setTimeout(() => {

        const words = value.split(' ');

        resolve(words.length > 2 ? {
          allowedWordsCount: 2,
          currentValue: value,
          errorMessage: 'Name must contain only one or two words!'
        } : null);

      }, delayTime);
    });
  };
}

