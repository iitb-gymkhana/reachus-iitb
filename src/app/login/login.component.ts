import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('', '');

  submitted = false;

  onSubmit() {
    this.auth.login(this.user)
      .subscribe(
        (res) => this.router.navigate(['']),
        (err) => this.alertService.error(err)
      );
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.auth.logout();
  }

}
