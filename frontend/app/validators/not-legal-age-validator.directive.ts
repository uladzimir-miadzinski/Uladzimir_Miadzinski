import {AbstractControl, ValidatorFn} from '@angular/forms';

export function notLegalAgeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const minAge = 18;
    const maxAge = 65;
    const age = control.value;
    const error = (age < minAge) ? {
      'mustBeMore': `${age} < ${minAge}`
    } : (age > maxAge) ? {
      'mustBeLess': `${age} > ${maxAge}`
    } : '';
    return error !== '' ? error : null;
  };
}

