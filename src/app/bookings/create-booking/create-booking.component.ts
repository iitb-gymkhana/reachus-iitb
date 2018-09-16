import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AlertService } from '../../_services/alert.service';
import { RoomService } from '../../_services/room.service';
import { BookingService } from '../../_services/booking.service';
import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit, AfterViewInit {
  rooms: any;
  TZ = 'Asia/Kolkata';
  booking_datetime: any;

  onSubmit(roomId) {
    const selectedDates = this.booking_datetime.selectedDates;

    if (selectedDates.length !== 0) {
      const startDateTime = moment(selectedDates[0]);
      const endDateTime = moment(selectedDates[1]);

      if (startDateTime.isAfter(endDateTime)) {
        this.alertService.errorWithMessage('The starting date/time of booking cannot be after end date/time of booking');
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
    this.booking_datetime = flatpickr('#from-datetime-picker', {
      dateFormat: 'Y-m-d h:i K',
      altFormat: 'F j, Y, h:i K',
      altInput: true,
      minDate: 'today',
      enableTime: true,
      plugins: [rangePlugin({ input: '#to-datetime-picker' })]
    });

  }

}
