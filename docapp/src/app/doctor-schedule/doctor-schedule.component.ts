import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../model/Appointment';
import { Day } from '../model/Day';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.scss']
})
export class DoctorScheduleComponent implements OnInit {
  years: number[] = [];
  months: number[] = [];
  days: Day[] = [];
  curryear = 0;
  currmonth = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.years = [2019, 2020, 2021, 2022];
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.curryear = new Date().getFullYear();
    this.currmonth = new Date().getMonth() + 1;
    this.populateDays();
    let year = this.route.snapshot.paramMap.get('y');
    this.route.queryParams.subscribe((param) => {
      debugger;
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

}
