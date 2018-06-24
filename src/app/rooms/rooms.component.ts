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
  rooms: Room[];

  public deleteRoomFromArr(number) {
    this.rooms = this.rooms.filter(x => x.number !== number);
  }

  constructor(
    private roomService: RoomService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.roomService.getAllRooms()
      .subscribe(
      (res) => this.rooms = res,
      (err) => this.alertService.error(err)
    );
  }

}
