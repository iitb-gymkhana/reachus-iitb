import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { OfferService } from '../../_services/offer.service';
import { AlertService } from '../../_services/alert.service';
import anchorme from 'anchorme';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {
  @Input() offer: any;
  @Input() disableActions: boolean;
  @Output() deleteOfferFromArr = new EventEmitter<any>();

  offerImageUrl: string;
  offerImageModalActive = false;

  approveOffer() {
    this.offerService.approveOffer(this.offer._id)
      .subscribe(
        (res) => {
          this.alertService.success(res['message']);
          this.offer.status = res['offer']['status'];
        },
        (err) => {
          this.alertService.error(err);
        }
      );
  }

  rejectOffer() {
    this.offerService.rejectOffer(this.offer._id)
      .subscribe(
        (res) => {
          this.alertService.success(res['message']);
          this.offer.status = res['offer']['status'];
        },
        (err) => this.alertService.error(err)
      );
  }

  deleteOffer() {
    this.offerService.deleteOffer(this.offer._id)
      .subscribe(
        (res) => {
          this.deleteOfferFromArr.emit(this.offer._id);
          this.alertService.success(res['message']);
        },
        (err) => this.alertService.error(err)
      );
  }

  toggleOfferImageModal() {
    this.offerImageModalActive = !this.offerImageModalActive;
  } 

  constructor(
    public authService: AuthService,
    public offerService: OfferService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.offerImageUrl = this.offerService.getOfferImageUrl(this.offer.offerImageFileName);
    this.offer.offerDetails = anchorme(this.offer.offerDetails, { attributes: [ { name: 'target', value: '_blank' } ] });
  }

}
