import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from './validation-error';

export function isInteger(num: string | number) {
  if (typeof num === 'number') {
    return Number.isInteger(num) && num > 0;
  } else {
    const n = Math.floor(Number(num));
    return n !== Infinity && String(n) === num && n >= 0;
  }
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

