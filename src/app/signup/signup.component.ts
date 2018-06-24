import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User('rp@rp.com', 'rohit1234');
  err = false;

  onSubmit() {
    this.err = false;

    this.auth.signup(this.user)
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
  }

}
