import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/_services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { Offer } from 'src/app/offer';
import flatpickr from 'flatpickr';
import { CategoryService } from 'src/app/_services/category.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  offer: Offer = new Offer('', '', '', '', '', '', '');
  validTill: any;
  categories: any;
  offerImage: any;
  offerImageSrc: any;

  constructor(
    public offerService: OfferService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.offerService.getOffer(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (res) => {
          this.offer = res;
          this.validTill = flatpickr('#date-picker', {
            dateFormat: 'Y-m-d',
            altFormat: 'F j, Y',
            altInput: true,
            minDate: 'today'
          });
          this.validTill.setDate(this.offer.validTill);
          this.offerImageSrc = this.offerService.getOfferImageUrl(this.offer.offerImageFileName);
        },
        (err) => this.alertService.error(err)
      );

    this.categoryService.getAllCategories()
        .subscribe(
          (res) => this.categories = res,
          (err) => this.alertService.error(err)
        );
  }

  onOfferImageUploaded(event) {
    this.offerImage = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = e => this.offerImageSrc = reader.result;

    reader.readAsDataURL(this.offerImage);
  }

  updateOffer() {
    const selectedDate = this.validTill.input.value;

    if (selectedDate) {
      const validTillDate = moment(`${selectedDate}`).endOf('day');

      this.offer.validTill = validTillDate.format();
      
      const uploadData = new FormData();
      
      if (this.offerImage) {
        uploadData.append('offerImage', this.offerImage, this.offerImage.name);
      }

      for (const key of Object.keys(this.offer)) {
        uploadData.append(key, this.offer[key]);
      }
      
      this.offerService.updateOffer(
        uploadData
      ).subscribe(
          (res) => {
            this.alertService.success(res.message);
            // this.offer = new Offer('', '', '', '', '', '', '');
            // console.log(res['offer']);
            // this.validTill.clear();
          },
          (err) => this.alertService.error(err)
        );


    } else {
      this.alertService.errorWithMessage('All inputs required');
    }
  }
}
