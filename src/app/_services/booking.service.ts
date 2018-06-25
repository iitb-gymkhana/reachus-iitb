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
  constructor(
    private http: HttpClient
  ) { }
}
