import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

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

    this.userService.userSignup(this.user)
      .subscribe(
        (res) => console.log(res),
        (err) => this.err = err.error
      );
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

}
