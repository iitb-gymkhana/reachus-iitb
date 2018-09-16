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
    this.bookingService.getAllBookings('Approved')
      .subscribe(
        (res) => this.bookings = res,
        (err) => this.alertService.error(err)
      );
  }

  getHeatMap() {
    const heatmap = {};

    for (const booking of this.bookings) {
      const from = moment(booking.from);
      const to = moment(booking.to);

      for (const m = from; m.diff(to, 'days') <= 0; m.add(1, 'days')) {
        const year = m.year().toString();
        const month = XunkCalendarModule.zeroPad((m.month() + 1).toString(), 2);
        const date = XunkCalendarModule.zeroPad(m.date().toString(), 2);

        const dateStr = year + month + date;

        if (dateStr in heatmap) {
          heatmap[dateStr] += 0.2;
        } else {
          heatmap[dateStr] = 0.2;
        }
      }
    }

    return heatmap;
  }

  getBookings(date: any) {
    const currDateBookings = [];

    for (const booking of this.bookings) {
      const booking_from = moment(booking.from);
      const booking_to = moment(booking.to);
      // console.log(booking_from);
      // console.log(booking_to);

      if (booking_from.year() === date.year &&
          (booking_from.month()) === date.month &&
          (booking_from.date() <= date.date && date.date <= booking_to.date())) {
            currDateBookings.push(booking);
          }
    }

    return currDateBookings;
  }

  getBookingsCount() {
    const count = this.getBookings(this.selDate).length;
    let count_str = `${count} Booking`;
    if (count !== 1) {
      count_str = count_str + 's';
    }

    return count_str;
  }

}
