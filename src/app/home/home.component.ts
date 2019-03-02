import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { environment } from '../../environments/environment';
import { OfferService } from '../_services/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginUrl = environment.loginUrl;

  constructor(
    public authService: AuthService,
    public offerService: OfferService
  ) { }

  ngOnInit() {

  }
}
