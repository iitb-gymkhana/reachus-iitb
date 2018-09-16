import { Component, OnInit } from '@angular/core';
import { XunkCalendarModule } from 'xunk-calendar';
import { BookingService } from '../_services/booking.service';
import { AlertService } from '../_services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selDate = XunkCalendarModule.getToday();
  bookings = [] as any;

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
    const heatmap = {};

    for (const booking of this.bookings) {
      const from = moment(booking.from);
      const year = from.year().toString();
      const month = XunkCalendarModule.zeroPad((from.month() + 1).toString(), 2);
      const date = XunkCalendarModule.zeroPad(from.date().toString(), 2);

      const dateStr = year + month + date;

      if (dateStr in heatmap) {
        heatmap[dateStr] += 0.2;
      } else {
        heatmap[dateStr] = 0.5;
      }
    }

    console.log(heatmap);

    return heatmap;
  }

}
