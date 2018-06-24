import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  apiBaseUrl = environment.apiBaseUrl;

  login(user: User): Observable<boolean> {
    return this.http.post<{token: string}>(
      `${this.apiBaseUrl}/users/authenticate`,
      {email: user.email, password: user.password})
      .pipe(
        map(result => {
          localStorage.setItem('user', JSON.stringify(result['user']));
          return true;
        })
      );
  }

  signup(user: User): Observable<boolean> {
    return this.http.post<{token: string}>(
      `${this.apiBaseUrl}/users`,
      { email: user.email, password: user.password })
      .pipe(
        map(result => {
          localStorage.setItem('user', result['user']);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('user') !== null);
  }

  public get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.admin;
  }
}
