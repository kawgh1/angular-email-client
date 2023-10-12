import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly rootUrl = 'https://api.angular-email.com';

  signedIn$ = new BehaviorSubject(false);

  constructor(private readonly httpClient: HttpClient) {}

  usernameAvailable(username: string) {
    return this.httpClient.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }
  signup(credentials: SignupCredentials) {
    return this.httpClient
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        // if an error is returned from the request, the tap() method is automatically skipped
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }

  checkAuth() {
    return this.httpClient
      .get<SignedInResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap((response) => {
          console.log(response);
          this.signedIn$.next(response.authenticated);
        })
      );
  }

  signOut() {
    return this.httpClient.post<any>(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    );
  }

  signIn(credentials: SignInCredentials) {
    return this.httpClient
      .post<any>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        // if an error is returned from the request - like wrong password, the tap() method is automatically skipped
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }
}
