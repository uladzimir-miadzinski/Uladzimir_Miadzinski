import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const date = control.value;
    const allowedFormats = [
      'YYYY/MM/DD',
      'DD-MMM-YY',
      'DD MMMM YYYY'
    ];
    return moment(date, allowedFormats, true).isValid() ? null : {
      'allowedFormats': allowedFormats,
      'currentValue': date,
      'errorMessage': `Invalid date format! Please use the required format. Allowed date formats: ${allowedFormats.join(', ')}.`
    };
  };
}

