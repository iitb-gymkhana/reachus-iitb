import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { BookingService } from '../../_services/booking.service';
import { AlertService } from '../../_services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {
  @Input() booking: any;
  @Input() disableActions: boolean;
  @Output() handleConflict = new EventEmitter<any>();
  @Output() deleteBookingFromArr = new EventEmitter<any>();
  TZ = 'Asia/Kolkata';

  approveBooking() {
    this.bookingService.approveBooking(this.booking._id)
      .subscribe(
        (res) => {
          this.alertService.success(res['message']);
          this.booking.status = res['booking']['status'];
        },
        (err) => {
          this.alertService.error(err);

          // will throw a 409 on booking conflict
          if (err.status === 409) {
            this.handleConflict.emit(
              {
                booking1: this.booking,
                booking2: err.error.booking
              }
            );
          }
        }
      );
  }

  rejectBooking() {
    this.bookingService.rejectBooking(this.booking._id)
      .subscribe(
        (res) => {
          this.alertService.success(res['message']);
          this.booking.status = res['booking']['status'];
        },
        (err) => this.alertService.error(err)
      );
  }

  deleteBooking() {
    this.bookingService.deleteBooking(this.booking._id)
      .subscribe(
        (res) => {
          this.deleteBookingFromArr.emit(this.booking._id);
          this.alertService.success(res['message']);
        },
        (err) => this.alertService.error(err)
      );
  }

  constructor(
    public authService: AuthService,
    private bookingService: BookingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

}
