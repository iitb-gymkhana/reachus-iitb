import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOffersComponent } from './category-offers.component';

describe('CategoryOffersComponent', () => {
  let component: CategoryOffersComponent;
  let fixture: ComponentFixture<CategoryOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
