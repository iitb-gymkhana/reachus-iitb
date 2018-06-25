import { Component, AfterViewInit } from '@angular/core';
import bulmaCalendar from 'node_modules/bulma-calendar/dist/js/bulma-calendar.min.js';
import * as moment from 'moment';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements AfterViewInit {

  onSubmit(startDate, startTime, endDate, endTime) {
    if (startDate && startTime && endDate && endTime) {
      const startDateTime = moment.utc(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm');
      const endDateTime = moment.utc(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm');

      console.log(startDateTime.format());
      console.log(endDateTime.format());

      if (startDateTime.isAfter(endDateTime)) {
        this.alertService.error('The starting date/time of booking cannot be after end date/time of booking');
      }

    } else {
      this.alertService.error('All inputs required');
    }
  }

  constructor(
    private alertService: AlertService
  ) { }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', function () {
      const datePickers = bulmaCalendar.attach('[type="date"]', {
        overlay: true
      });
    });
  }

}
