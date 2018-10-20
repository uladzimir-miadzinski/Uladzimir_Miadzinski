import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from './validation-error';

export function isInteger(str: string | number) {
  const n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
}

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    const { value } = control;
    if (value === '') {
      return null;
    }

    return isInteger(value) ? null : {
      allowed: `integer`,
      current: value,
      error: 'Only integer numbers are allowed!'
    };
  };
}

