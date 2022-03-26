import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { Appointment } from '../model/Appointment';
import { Day } from '../model/Day';
import { Month } from '../model/Month';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.scss']
})
export class DoctorScheduleComponent implements OnInit {
  currAppointment = new Appointment();
  years: number[] = [];
  months: Month[] = [];
  mapMonths = new Map<number, string>();
  days: Day[] = [];
  curryear = 0;
  currmonth = 0;
  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.years = [2019, 2020, 2021, 2022];
    this.curryear = new Date().getFullYear();
    this.currmonth = new Date().getMonth() + 1;
    this.months = new Month(0, '').getAllMonths();
    this.populateDays();
    let year = this.route.snapshot.paramMap.get('y');
    this.route.queryParams.subscribe((param) => {

      let paramyear = param['y'];
      let parammonth = param['m'];
      if (paramyear != null && parammonth != null) {
        this.setMonthYearFromParam(parseInt(paramyear), parseInt(paramyear));
        console.log(this.curryear + ", " + this.currmonth);
        this.populateDays();
      }
    });
  }

  setMonthYearFromParam(year: number, month: number) {
    if (year != undefined && month != undefined) {
      if (year >= 2019 && year <= 2022) {
        this.curryear = year;
        this.currmonth = month;
      }
    }
  }

  populateDays() {
    this.days = [];
    let d = new Date(this.curryear, this.currmonth, 0);
    let nDays = d.getDate();
    let daycounter = 1;
    for (daycounter = 1; daycounter <= nDays; daycounter++) {
      let day = new Day();
      day.daynumber = daycounter;
      day.appointments = this.getAppointments();
      this.days.push(day);
    }
  }

  getAppointments(): Appointment[] {
    return [];
  }

  yearChanged(param: any) {
    this.curryear = param.value;
    this.populateDays();
  }

  monthChanged(param: any) {
    this.currmonth = param.value;
    this.populateDays();
  }

  openAppointmentDialog() {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      data: this.currAppointment
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.currAppointment = result;
    });
  }

}
