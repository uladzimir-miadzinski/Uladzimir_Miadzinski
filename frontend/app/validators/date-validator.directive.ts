import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {ValidationError} from './validation-error';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    const {value: date} = control;
    const allowedFormats = [
      'YYYY/MM/DD',
      'DD-MMM-YY',
      'DD MMMM YYYY'
    ];
    return (date === '') ? null : moment(date, allowedFormats, true).isValid() ? null : {
      allowed: allowedFormats,
      current: date,
      message: `validators.invalidDateFormat`
    };
  };
}

