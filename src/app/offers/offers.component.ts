import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OfferService } from '../_services/offer.service';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit, AfterViewInit {
  offers: any;
  tab = 2;
  approvedOffersCheckbox = true;
  rejectedOffersCheckbox = true;
  pendingApprovalOffersCheckbox = true;

  isOfferVisible(offer) {
    if (offer.status === 'Approved') {
      return this.approvedOffersCheckbox;
    } else if (offer.status === 'Rejected') {
      return this.rejectedOffersCheckbox;
    }

    return this.pendingApprovalOffersCheckbox;
  }

  fetchAllOffers() {
    const params = {};

    if (this.tab === 0) {
      params['validTill'] = moment().toISOString();
    } else if (this.tab === 1) {
      params['validTill'] = moment().toISOString();
      params['sort'] = 'desc';
    }

    if (!(this.authService.isAdmin || this.authService.isModerator)) {
      params['user'] = this.authService.getUsername()
    }

    this.offerService.getAllOffers(params)
      .subscribe(
        (res) => this.offers = res,
        (err) => this.alertService.error(err)
      );
  }

  changeOffersStatus(changedOffers) {
    for (let i = 0; i < this.offers.length; i++) {
      if (this.offers[i]._id === changedOffers.approveId) {
        this.offers[i].status = 'Approved';
      }

      if (this.offers[i]._id === changedOffers.rejectId) {
        this.offers[i].status = 'Rejected';
      }
    }
  }

  deleteOfferFromArr(offer_id) {
    for (let i = 0; i < this.offers.length; i++) {
      if (offer_id === this.offers[i]._id) {
        this.offers.splice(i, 1);
        return;
      }
    }
  }

  constructor(
    private authService: AuthService,
    private offerService: OfferService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.fetchAllOffers();
  }

  ngAfterViewInit() {

  }

}
