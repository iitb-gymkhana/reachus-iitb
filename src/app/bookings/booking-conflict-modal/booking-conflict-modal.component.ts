import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { BookingService } from '../../_services/booking.service';
import { AlertService } from '../../_services/alert.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-booking-conflict-modal',
  templateUrl: './booking-conflict-modal.component.html',
  styleUrls: ['./booking-conflict-modal.component.css']
})
export class BookingConflictModalComponent implements AfterViewInit {
  @Input() booking1: any;
  @Input() booking2: any;
  @Input() hasConflict: Boolean;
  @Output() hasConflictChange = new EventEmitter<Boolean>();
  @Output() conflictResolvedBookings = new EventEmitter<any>();

  public approveBooking(i: number) {
    let approveId, rejectId;

    if (i === 0) {
      approveId = this.booking1._id;
      rejectId = this.booking2._id;
    } else {
      approveId = this.booking2._id;
      rejectId = this.booking1._id;
    }

    this.bookingService.resolveConflict(approveId, rejectId)
      .subscribe(
        (res) => {
          this.alertService.success(res['message']);
          this.conflictResolvedBookings.emit(
            {
              approveId: approveId,
              rejectId: rejectId
            }
          );
        },
        (err) => this.alertService.error(err)
      );

    this.hasConflictChange.emit(false);
  }

  closeModal() {
    this.hasConflictChange.emit(false);
  }

  constructor(
    public authService: AuthService,
    private bookingService: BookingService,
    private alertService: AlertService
  ) { }

  ngAfterViewInit() {
  }

}
