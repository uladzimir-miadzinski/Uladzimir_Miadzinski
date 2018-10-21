import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {ValidationError} from './validation-error';

export function notEmptyStr(str: string) {
  return str !== '';
}

export function maxTwoWordsValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationError | null> => {
    const {value} = control;
    return new Promise<ValidationError | null>(resolve => {
      const delayTime = 3000;
      setTimeout(() => {
        if (value !== null) {
          const words = value.trim().split(' ').filter(notEmptyStr);

          resolve(words.length > 2 ? {
            allowed: `1-2 words with space between`,
            current: value,
            message: 'Control value must contain one or two words!'
          } : null);
        } else {
          resolve(null);
        }

      }, delayTime);
    });
  };
}

