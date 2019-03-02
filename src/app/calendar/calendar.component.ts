import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfferService } from '../_services/offer.service';
import { AlertService } from '../_services/alert.service';
import * as moment from 'moment';
import { AuthService } from '../_services/auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  loginUrl = environment.loginUrl;
  offers = [] as any;
  getBookingsSubscription: any;

  constructor(
    private offerService: OfferService,
    private alertService: AlertService,
    public authService: AuthService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
  }
}
