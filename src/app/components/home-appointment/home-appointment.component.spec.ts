import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAppointmentComponent } from './home-appointment.component';

describe('HomeAppointmentComponent', () => {
  let component: HomeAppointmentComponent;
  let fixture: ComponentFixture<HomeAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
