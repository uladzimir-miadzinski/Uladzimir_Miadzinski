import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidationError} from './validation-error';

export function notLegalAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    const {value: age} = control;
    if (age === '') {
      return null;
    }

    const minAge = 18;
    const maxAge = 65;

    const ageNumber = Number.parseInt(control.value, 10);
    const error = (ageNumber < minAge) ? `ageTooSmall` : (ageNumber > maxAge) ? `ageTooLarge` : '';

    return (error !== '') ? {
      allowed: `${minAge} <= Age <= ${maxAge}`,
      current: age,
      error: `validators.${error}`
    } : null;
  };
}

