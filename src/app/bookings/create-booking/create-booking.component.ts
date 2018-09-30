import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AlertService } from '../../_services/alert.service';
import { RoomService } from '../../_services/room.service';
import { BookingService } from '../../_services/booking.service';
import flatpickr from 'flatpickr';
import { Booking } from '../../booking';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit, AfterViewInit {
  rooms: any;
  TZ = 'Asia/Kolkata';
  booking_date: any;
  booking_from_time: any;
  booking_to_time: any;
  booking = new Booking('', '', '');

  onSubmit(roomId) {
    const selectedDate = this.booking_date.input.value;
    const fromTime = this.booking_from_time.input.value;
    const toTime = this.booking_to_time.input.value;

    if (selectedDate && fromTime && toTime) {
      const startDateTime = moment(`${selectedDate} ${fromTime}`);
      const endDateTime = moment(`${selectedDate} ${toTime}`);

      if (startDateTime.isAfter(endDateTime)) {
        this.alertService.errorWithMessage('The starting date/time of booking cannot be after end date/time of booking');
        } else {
        this.bookingService.createBooking(
          {
            from: startDateTime.format(),
            to: endDateTime.format(),
            room: roomId,
            councilName: this.booking.councilName,
            purposeOfBooking: this.booking.purposeOfBooking
          }
        )
        .subscribe(
          (res) => {
            this.alertService.success(res.message);
            this.booking = new Booking('', '', '');
            this.booking_date.clear();
            this.booking_from_time.clear();
            this.booking_to_time.clear();
          },
          (err) => this.alertService.error(err)
        );
      }

    } else {
      this.alertService.errorWithMessage('All inputs required');
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
    this.booking_date = flatpickr('#date-picker', {
      dateFormat: 'Y-m-d',
      altFormat: 'F j, Y',
      altInput: true,
      minDate: 'today'
    });

    this.booking_from_time = flatpickr('#from-time-picker', {
      dateFormat: 'H:i',
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: 'h:i K'
    });

    this.booking_to_time = flatpickr('#to-time-picker', {
      dateFormat: 'H:i',
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: 'h:i K'
    });

  }

}
