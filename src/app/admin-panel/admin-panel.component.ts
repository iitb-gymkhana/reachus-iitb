import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  onSubmit(user) {
    this.authService.getUserDetails(user)
      .subscribe(
        (res) => console.log(res),
        (err) => this.alertService.error(err)
      );
  }
  constructor(
    public authService: AuthService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
  }

}
