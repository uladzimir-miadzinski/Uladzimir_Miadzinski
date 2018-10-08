import {AbstractControl, ValidatorFn} from '@angular/forms';

export function notLegalAgeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const minAge = 18;
    const maxAge = 65;
    const age = (control.value !== '') ? Number.parseInt(control.value, 10) : 0;
    const error = (age < minAge) ? {
      'min': minAge,
      'currentValue': age
    } : (age > maxAge) ? {
      'max': maxAge,
      'currentValue': age
    } : '';
    return error !== '' ? error : null;
  };
}

