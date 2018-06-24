import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('', '');
  err = false;

  submitted = false;

  onSubmit() {
    this.err = false;

    this.auth.login(this.user)
      .subscribe(
        (res) => this.router.navigate(['']),
        (err) => this.err = err.error
      );
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.logout();
  }

}
