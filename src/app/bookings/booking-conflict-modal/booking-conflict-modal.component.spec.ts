import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConflictModalComponent } from './booking-conflict-modal.component';

describe('BookingConflictModalComponent', () => {
  let component: BookingConflictModalComponent;
  let fixture: ComponentFixture<BookingConflictModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingConflictModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingConflictModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
