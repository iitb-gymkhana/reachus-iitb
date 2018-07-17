import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, AfterViewInit {
  bookings: any;
  tab = 0;
  conflictedBookings: any;
  hasConflict = false;


  fetchAllBookings() {
    if (this.authService.isAdmin) {
      this.bookingService.getAllBookings()
        .subscribe(
          (res) => this.bookings = res,
          (err) => this.alertService.error(err)
        );
    } else {
      this.bookingService.getUserBookings()
        .subscribe(
          (res) => this.bookings = res,
          (err) => this.alertService.error(err)
        );
      }
  }

  handleConflict(conflictedBookings) {
    this.conflictedBookings = conflictedBookings;
    this.hasConflict = true;
  }

  changeBookingsStatus(changedBookings) {
    for (let i = 0; i < this.bookings.length; i++) {
      if (this.bookings[i]._id === changedBookings.approveId) {
        this.bookings[i].status = 'Approved';
      }

      if (this.bookings[i]._id === changedBookings.rejectId) {
        this.bookings[i].status = 'Rejected';
      }
    }
  }

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.fetchAllBookings();
  }

  ngAfterViewInit() {

  }

}
