import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { environment } from '../../environments/environment';
import { OfferService } from '../_services/offer.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginUrl = environment.loginUrl;
  approvedOffers: any = [];

  constructor(
    public authService: AuthService,
    private offerService: OfferService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.offerService.getAllOffers(
      { status: 'Approved' }
    ).subscribe(
      (res) => this.approvedOffers = res,
      (err) => this.alertService.error(err)
    );
  }
}
