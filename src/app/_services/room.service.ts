import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Room } from '../room';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }

  apiBaseUrl = environment.apiBaseUrl;

  createRoom(room: Room) {
    return this.http.post(
      `${this.apiBaseUrl}/rooms`,
      room)
      .pipe(
        map(result => {
          return result;
        })
      );
  }
}
