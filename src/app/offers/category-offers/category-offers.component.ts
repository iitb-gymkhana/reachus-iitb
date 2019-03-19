import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/_services/offer.service';
import { AlertService } from 'src/app/_services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-category-offers',
  templateUrl: './category-offers.component.html',
  styleUrls: ['./category-offers.component.css']
})
export class CategoryOffersComponent implements OnInit {

  offers: any = [];

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('category');
    const params = {
      'status': 'Approved',
      'uniqueIdentifier': category,
      'validTill': moment().endOf('day').toISOString()
    };

    this.offerService.getAllOffers(params)
      .subscribe(
        (res) => this.offers = res,
        (err) => this.alertService.error(err)
      )
  }

}
