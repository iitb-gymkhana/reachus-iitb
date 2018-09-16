import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  user: any;
  changing_status = false;

  onSubmit(user) {
    this.user = null;
    this.authService.getUserDetails(user)
      .subscribe(
        (res) => this.user = res,
        (err) => this.alertService.error(err)
      );
  }

  onChange(privilege, value) {
    this.changing_status = true;
    this.authService.changeUserPrivilege(this.user.ldap_username, privilege, value)
      .subscribe(
        (res) => {
          this.alertService.success(res.message);
          this.changing_status = false;
        },
        (err) => {
          this.alertService.error(err);
          this.changing_status = false;
        }
      );
  }
  constructor(
    public authService: AuthService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
  }

}
