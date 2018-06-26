import { Component, AfterViewInit, OnInit } from '@angular/core';
import bulmaCalendar from 'node_modules/bulma-calendar/dist/js/bulma-calendar.min.js';
import * as moment from 'moment';
import { AlertService } from '../../_services/alert.service';
import { Room } from '../../room';
import { RoomService } from '../../_services/room.service';
import { BookingService } from '../../_services/booking.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit, AfterViewInit {
  rooms: any;

  onSubmit(startDate, startTime, endDate, endTime, roomId) {
    if (startDate && startTime && endDate && endTime) {
      const startDateTime = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm');
      const endDateTime = moment(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm');

      if (startDateTime.isAfter(endDateTime)) {
        this.alertService.error('The starting date/time of booking cannot be after end date/time of booking');
      } else {
        this.bookingService.createBooking(
          {
            from: startDateTime.format(),
            to: endDateTime.format(),
            room: roomId
          }
        )
        .subscribe(
          (res) => this.alertService.success(res.message),
          (err) => this.alertService.error(err)
        );
      }

    } else {
      this.alertService.error('All inputs required');
    }
  }

  constructor(
    private alertService: AlertService,
    private roomService: RoomService,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.roomService.getAllRooms()
      .subscribe(
        (res) => this.rooms = res,
        (err) => this.alertService.error(err)
      );
  }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', function () {
      const datePickers = bulmaCalendar.attach('[type="date"]', {
        overlay: true
      });
    });
  }

}
