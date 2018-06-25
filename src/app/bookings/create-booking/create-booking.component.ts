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
    console.log(startDate);
    console.log(startTime);
    console.log(endDate);
    console.log(endTime);

    if (startDate && startTime && endDate && endTime) {
      const startDateTime = moment(`${startDate} ${startTime}`, 'yyyy-mm-dd hh:mm');
      const endDateTime = moment(`${endDate} ${endTime}`, 'yyyy-mm-dd hh:mm');

      console.log(startDateTime < endDateTime);
      console.log(startDateTime);
      console.log(endDateTime);
    } else {
      this.alertService.error('All inputs required');
    }
    
    
  }

  constructor(
    private alertService: AlertService
  ) { }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', function () {
      const datePickers = bulmaCalendar.attach('[type="date"]');
      // datePickers now contains an Array of all datePicker instances
    });
  }

}
