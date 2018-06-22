import { Component, OnInit } from '@angular/core';
import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new Login('', '');

  submitted = false;

  onSubmit() {
    console.log(this.login);
  }

  constructor() { }

  ngOnInit() {
  }

}
