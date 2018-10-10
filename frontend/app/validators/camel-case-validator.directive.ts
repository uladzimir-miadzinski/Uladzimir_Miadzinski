import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';

export function firstUpper(str: string) {
  return str.length > 0 ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
}

export function camelCaseValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const value = control.value;
    return new Promise<ValidationErrors | null>(resolve => {
      const delayTime = 3000;
      setTimeout(() => {

        const words: string[] = value.split(' ');
        const camelcaseWords: string[] = words.map((word: string) => {
          return firstUpper(word);
        });

        words.forEach((word: string, index: number) => {
          if (word !== camelcaseWords[index]) {
            resolve({
              allowedFormat: 'Camel Case',
              currentValue: value,
              errorMessage: 'Name must be Camel Case format!'
            });
          }
        });

        resolve(null);

      }, delayTime);
    });
  };
}

