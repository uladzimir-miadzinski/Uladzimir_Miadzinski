import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {ValidationError} from './validation-error';

export function onlyLatinValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationError | null> => {
    const {value} = control;
    return new Promise<ValidationError | null>(resolve => {
      const delayTime = 3000;
      setTimeout(() => {

        if (value !== null) {

          [...value].forEach((char: string) => {
            const charCode = char.charCodeAt(0);
            if ((charCode < 65 || (charCode > 90 && charCode < 97) || charCode > 125) && charCode !== 32) {
              resolve({
                allowed: 'Latin and "&nbsp;" (space) char',
                current: value,
                message: 'validators.onlyLatin'
              });
            }
          });

        }

        resolve(null);

      }, delayTime);
    });
  };
}

