import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetaildialogComponent } from './appointment-detaildialog.component';

describe('AppointmentDetaildialogComponent', () => {
  let component: AppointmentDetaildialogComponent;
  let fixture: ComponentFixture<AppointmentDetaildialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDetaildialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetaildialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
