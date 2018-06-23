import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  apiBaseUrl = environment.apiBaseUrl;

  login(user: User): Observable<boolean> {
    return this.http.post<{token: string}>(
      `${this.apiBaseUrl}/users/authenticate`,
      {email: user.email, password: user.password})
      .pipe(
        map(result => {
          localStorage.setItem('token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  public get isAdmin(): boolean {
    const scope = this.jwtHelper.decodeToken(localStorage.getItem('token')).scope
    return scope === 'admin';
  }
}
