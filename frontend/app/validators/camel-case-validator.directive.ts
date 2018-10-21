import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {ValidationError} from './validation-error';

export function firstUpper(str: string) {
  return str.length > 0 ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
}

export function camelCaseValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationError | null> => {
    const {value} = control;
    return new Promise<ValidationError | null>(resolve => {
      const delayTime = 3000;
      setTimeout(() => {

        if (value !== null) {
          const words: string[] = value.split(' ');
          const camelcaseWords: string[] = words.map((word: string) => {
            return firstUpper(word);
          });

          words.forEach((word: string, index: number) => {
            if (word !== camelcaseWords[index]) {
              resolve({
                allowed: 'Camel Case',
                current: value,
                message: 'Value must be in Camel Case format!'
              });
            }
          });
        }

        resolve(null);

      }, delayTime);
    });
  };
}

