import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';

export function onlyLatinValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const value = control.value;
    return new Promise<ValidationErrors | null>(resolve => {
      const delayTime = 1000;
      setTimeout(() => {

        [...value].forEach((char: string) => {
          const charCode = char.charCodeAt(0);
          if ((charCode < 65 || (charCode > 90 && charCode < 97) || charCode > 125) && charCode !== 32) {
            resolve({
              allowedChars: 'Latin/[" "]',
              currentValue: value,
              errorMessage: 'Name must contain only latin chars wo number and special symbols!'
            });
          }
        });

        resolve(null);

      }, delayTime);
    });
  };
}

