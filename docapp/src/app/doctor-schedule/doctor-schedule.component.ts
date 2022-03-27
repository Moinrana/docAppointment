import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppointmentDetaildialogComponent } from '../appointment-detaildialog/appointment-detaildialog.component';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { LstorageService } from '../lstorage.service';
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
  daynames = new Map<number, string>([
    [0, "Thu"],
    [1, "Fri"],
    [2, "Sat"],
    [3, "Sun"],
    [4, "Mon"],
    [5, "Tue"],
    [6, "Wed"],
  ]);
  dayn: string[] = [];
  months: Month[] = [];
  mapMonths = new Map<number, string>();
  days: Day[] = [];
  curryear = 0;
  currmonth = 0;
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private lservice: LstorageService) { }

  ngOnInit(): void {
    this.years = [2019, 2020, 2021, 2022];
    this.curryear = new Date().getFullYear();
    this.currmonth = new Date().getMonth() + 1;
    this.months = new Month(0, '').getAllMonths();
    this.populateDays();
    this.route.paramMap.subscribe((param: ParamMap) => {
      let paramyear = param.get("y");
      let parammonth = param.get("m");
      if (paramyear != null && parammonth != null) {
        this.setMonthYearFromParam(parseInt(paramyear), parseInt(parammonth));
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
    this.dayn = [];
    let d = new Date(this.curryear, this.currmonth, 0);
    let nDays = d.getDate();
    let daycounter = 1;
    for (daycounter = 1; daycounter <= nDays; daycounter++) {
      if (daycounter < 8) {

        let val = this.daynames.get(new Date(this.curryear, this.currmonth, daycounter).getDay())?.toString();
        if (val) {
          this.dayn.push(val);
        }
      }
      let day = new Day(daycounter, this.getAppointments(daycounter));
      this.days.push(day);
    }
  }

  populateDaynames() {
    this.dayn  = [];
    for (let i = 1; i < 8; i++) {
      let val = this.daynames.get(new Date(this.curryear, this.currmonth, i).getDay())?.toString();
      if (val) {
        this.dayn.push(val);
      }
    }
  }

  getAppointments(day: number): Appointment[] {
    let selectedAppointments: Appointment[] = [];
    let allappointments = this.lservice.get('appointments');

    allappointments.forEach(apm => {
      let appday = new Date(apm.date).getDate();
      let appmonth = new Date(apm.date).getMonth() + 1;
      let appyear = new Date(apm.date).getFullYear();

      if (day === appday && this.currmonth === appmonth && this.curryear === appyear) {
        selectedAppointments.push(apm);
      }
    });
    // selectedAppointments.sort((a, b) => b.timeint - a.timeint);
    return selectedAppointments;
  }

  arrangeAppointments() {
    this.days.forEach(day => {
      day.appointments = this.getAppointments(day.daynumber);
    });
  }

  addAppointmentOnCurrentPage(apmnt: Appointment) {
    if ((new Date(apmnt.date).getMonth() + 1) === this.currmonth && new Date(apmnt.date).getFullYear() === this.curryear) {
      for (let i = 0; i < this.days.length; i++) {
        if (this.days[i].daynumber === new Date(apmnt.date).getDate()) {
          this.days[i].appointments.push(apmnt);
          this.days[i].appointments.sort((a, b) => a.timeint - b.timeint);
          break;
        }
      }
    }
  }

  yearChanged(param: any) {
    this.curryear = param.value;
    this.yearmonthchanged();
  }

  monthChanged(param: any) {
    this.currmonth = param.value;
    //this.populateDays();
    this.yearmonthchanged();
  }

  yearmonthchanged() {
    let numberofdays = new Date(this.curryear, this.currmonth, 0).getDate();
    let diff = this.days.length - numberofdays;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.days.pop();
      }
    }
    else {
      let lowerc = this.days[this.days.length - 1].daynumber;
      for (let i = 0; i < (diff * -1); i++) {
        this.days.push(new Day(++lowerc, []));
      }
    }
    this.populateDaynames();
    this.arrangeAppointments();
  }

  openAppointmentDialog() {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      data: this.currAppointment
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result) {
        return;
      }
      this.currAppointment = result;
      if (this.currAppointment.name != '') {
        this.lservice.add(this.currAppointment, 'appointments');
        alert('Appointment created successfully');
        this.addAppointmentOnCurrentPage(this.currAppointment);
      }
    });
  }

  gotoDetail(apmnt: Appointment) {
    const dialogRef = this.dialog.open(AppointmentDetaildialogComponent, {
      width: '300px',
      data: apmnt
    });
  }

}
