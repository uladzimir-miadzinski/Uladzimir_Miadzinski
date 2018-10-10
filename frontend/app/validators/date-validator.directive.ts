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
    return moment(date, allowedFormats, true).isValid() ? null : {
      allowed: allowedFormats,
      current: date,
      message: `Invalid date format! Please use the required format. Allowed date formats are: ${allowedFormats.join(', ')}.`
    };
  };
}

