import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthReponse } from './auth-response.model';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiKey = 'AIzaSyCg51NRoEj4GDmxehwYMRnfBYJhpM0IWlg';
  user = new BehaviorSubject<User | null>(null);

  register(email: string, password: string) {
    return this.http
      .post<AuthReponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((response) => {
          this.handleUser(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthReponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((response) => {
          this.handleUser(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  autoLogin() {
    if (localStorage.getItem('user') == null) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUser.getToken()) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Error';
    if (error.error.error) {
      switch (error.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          message =
            'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case 'INVALID_PASSWORD':
          message =
            'The password is invalid or the user does not have a password.';
          break;
        case 'USER_DISABLED':
          message = 'The user account has been disabled by an administrator.';
          break;
        case 'EMAIL_EXISTS':
          message = 'The email address is already in use by another account.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          message = 'Password sign-in is disabled for this project.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          message =
            ' We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
      }
    }

    return throwError(() => message);
  }

  private handleUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);

    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
