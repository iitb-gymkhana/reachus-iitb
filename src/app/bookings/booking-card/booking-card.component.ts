import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { BookingService } from '../../_services/booking.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {
  @Input() booking: any;

  approveBooking() {
    this.bookingService.approveBooking(this.booking._id)
      .subscribe(
        (res) => this.alertService.success(res['message']),
        (err) => this.alertService.error(err)
      );
  }

  rejectBooking() {
    this.bookingService.rejectBooking(this.booking._id)
      .subscribe(
        (res) => this.alertService.success(res['message']),
        (err) => this.alertService.error(err)
      );
  }

  deleteBooking() {
    this.bookingService.deleteBooking(this.booking._id)
      .subscribe(
        (res) => this.alertService.success(res['message']),
        (err) => this.alertService.error(err)
      );
  }

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

}
