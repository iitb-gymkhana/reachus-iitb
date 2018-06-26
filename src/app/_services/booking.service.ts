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

  public deleteBooking(_id) {
    return this.http.delete(
      `${this.apiBaseUrl}/bookings/${_id}`
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
