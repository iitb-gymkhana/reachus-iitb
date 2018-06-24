import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../_services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  err = false;

  room = new Room(null, '');

  onSubmit() {
    this.err = false;

    this.roomService.createRoom(this.room)
      .subscribe(
        (res) => console.log(res),
        (err) => this.err = err.error
      );

    this.room = new Room(null, '');
  }

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

}
