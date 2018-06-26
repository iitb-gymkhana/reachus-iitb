import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {
  @Input() booking: any;

  approveBooking() {
    console.log('approve');
  }

  rejectBooking() {
    console.log('reject');
  }

  deleteBooking() {
    console.log('delete');
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

}
