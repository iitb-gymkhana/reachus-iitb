import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  apiBaseUrl = environment.apiBaseUrl;

  public createBooking(booking) {
    return this.http.post<{message: string}>(
      `${this.apiBaseUrl}/bookings`,
      booking);
  }

  public getAllBookings() {
    return this.http.get(
      `${this.apiBaseUrl}/bookings`
    );
  }

  public getUserBookings() {
    return this.http.get(
      `${this.apiBaseUrl}/bookings/user`
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
