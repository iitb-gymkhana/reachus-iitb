import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../_services/room.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  room = new Room(null, '');

  onSubmit() {
    this.roomService.createRoom(this.room)
      .subscribe(
        (res) => this.alertService.success(res['message']),
        (err) => this.alertService.error(err)
      );

    this.room = new Room(null, '');
  }

  constructor(
    private roomService: RoomService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

}
