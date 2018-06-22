import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user'; 
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseUrl = environment.apiBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  userLogin(user: User) {
    return this.http.post(
      `${this.apiBaseUrl}/users/authenticate`,
      user,
      this.httpOptions
    );
  }

  userSignup(user: User) {
    return this.http.post(
      `${this.apiBaseUrl}/users`,
      user,
      this.httpOptions
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
