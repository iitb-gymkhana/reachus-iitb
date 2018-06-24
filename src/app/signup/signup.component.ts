import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User('', '');

  onSubmit() {
    this.auth.signup(this.user)
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
  }

}
