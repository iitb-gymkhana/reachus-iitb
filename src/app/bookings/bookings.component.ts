import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, AfterViewInit {
  bookings: any;
  tab = 0;

  fetchAllBookings() {
    this.bookingService.getUserBookings()
      .subscribe(
        (res) => this.bookings = res,
        (err) => this.alertService.error(err)
      );
  }

  constructor(
    private bookingService: BookingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.fetchAllBookings();
  }

  ngAfterViewInit() {

  }

}
