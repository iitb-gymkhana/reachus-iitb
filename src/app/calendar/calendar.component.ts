import { Component, OnInit } from '@angular/core';
import { XunkCalendarModule } from 'xunk-calendar';
import { BookingService } from '../_services/booking.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selDate = XunkCalendarModule.getToday();
  bookings: any;

  constructor(
    private bookingService: BookingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.bookingService.getAllBookings()
      .subscribe(
        (res) => this.bookings = res,
        (err) => this.alertService.error(err)
      );
  }

  getHeatMap() {
    return { '20180902': 1 };
  }

}
