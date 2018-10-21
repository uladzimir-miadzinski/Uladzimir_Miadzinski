import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidationError } from './validation-error';

export function usernameExistsValidator(authService: AuthService): AsyncValidatorFn {

  return (control: AbstractControl): Promise<ValidationError | null> | Observable<ValidationError | null> => {
    const {value} = control;
    return authService.getUserByUsername(value).pipe(
      map(userExists => {
        return userExists ? null : {
          current: value,
          message: 'validators.usernameNotFound'
        };
      })
    );
  };

}
