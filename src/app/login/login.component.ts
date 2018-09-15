import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.route.queryParams.subscribe(params => {
      if (!('code' in params)) {
        this.router.navigate(['']);
      } else {
        this.authService.login(params.code).subscribe(
          (res) => this.router.navigate(['']),
          (err) => this.alertService.error(err)
        );
      }
    });
  }

}
