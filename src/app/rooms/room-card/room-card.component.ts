import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { RoomService } from '../../_services/room.service';
import { AlertService } from '../../_services/alert.service';
import { Room } from '../../room';
import * as $ from 'jquery';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit, AfterViewInit {
  @Input() room: Room;
  @Output() deleteRoomFromArr = new EventEmitter<number>();

  isEditable = false;
  roomValueBackup: Room;

  editRoom() {
    this.isEditable = true;
    this.roomValueBackup = new Room(this.room.number, this.room.name);
  }

  deleteRoom() {
    this.roomService.deleteRoom(this.room.number)
      .subscribe(
        (res) => this.alertService.success(res.message),
        (err) => this.alertService.error(err)
      );

    this.deleteRoomFromArr.emit(this.room.number);
  }

  updateRoom() {
    this.roomService.updateRoom(this.room)
      .subscribe(
        (res) => this.alertService.success(res.message),
        (err) => {
          this.undoRoomEdit();
          this.alertService.error(err);
        }
      );
    this.isEditable = false;
  }

  undoRoomEdit() {
    this.isEditable = false;
    this.room.number = this.roomValueBackup.number;
    this.room.name = this.roomValueBackup.name;
  }

  constructor(
    private roomService: RoomService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
