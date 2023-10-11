import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private readonly httpClient: HttpClient) {}

  // define as an arrow function to bind 'this' to the component the function is used in
  validate = (abstractControl: AbstractControl) => {
    const { value } = abstractControl;

    return this.httpClient
      .post<any>('https://api.angular-email.com/auth/username', {
        username: value,
      })
      .pipe(
        // .pipe(map() => { response }) is returning the network response
        map((value) => {
          if (value.available) {
            return null;
          } else {
            return value;
          }
        }),
        catchError((err) => {
          console.log(err);
          if (err.error.username) {
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noInternetConnection: true });
          }
        })
      );
  };
}
