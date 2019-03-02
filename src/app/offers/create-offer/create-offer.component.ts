import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AlertService } from '../../_services/alert.service';
import { CategoryService } from '../../_services/category.service';
import { OfferService } from '../../_services/offer.service';
import flatpickr from 'flatpickr';
import { Offer } from '../../offer';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit, AfterViewInit {
  categories: any;
  TZ = 'Asia/Kolkata';
  validTill: any;
  offer = new Offer('', '', '', '');

  onSubmit() {
    const selectedDate = this.validTill.input.value;

    if (selectedDate) {
      const validTillDate = moment(`${selectedDate}`);

      this.offer.validTill = validTillDate.format();

      this.offerService.createOffer(
        this.offer
      ).subscribe(
          (res) => {
            this.alertService.success(res.message);
            this.offer = new Offer('', '', '', '');
            this.validTill.clear();
          },
          (err) => this.alertService.error(err)
        );


    } else {
      this.alertService.errorWithMessage('All inputs required');
    }
  }

  constructor(
    private alertService: AlertService,
    private categoryService: CategoryService,
    private offerService: OfferService
  ) { }

  ngOnInit() {
    this.categoryService.getAllCategories()
      .subscribe(
        (res) => this.categories = res,
        (err) => this.alertService.error(err)
      );
  }

  ngAfterViewInit() {
    this.validTill = flatpickr('#date-picker', {
      dateFormat: 'Y-m-d',
      altFormat: 'F j, Y',
      altInput: true,
      minDate: 'today'
    });

  }

}
