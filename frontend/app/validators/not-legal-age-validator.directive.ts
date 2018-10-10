import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidationError} from './validation-error';

export function notLegalAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    const minAge = 18;
    const maxAge = 65;
    const {value: age} = control;
    const error = (age < minAge) ? 'min' : (age > maxAge) ? 'max' : '';

    return (error !== '') ? {
      allowed: `${minAge} <= Age <= ${maxAge}`,
      current: age,
      error: error
    } : null;
  };
}

