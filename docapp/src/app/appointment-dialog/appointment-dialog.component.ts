import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../model/Appointment';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {
  apmntForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment, public fBuilder: FormBuilder
  ) {

    this.apmntForm = this.fBuilder.group({
      name: ['', [
        Validators.required
      ]]
      , age: ['', [
        Validators.required,
        Validators.max(100),
        Validators.min(1)
      ]]
      , gender: ['', [
        Validators.required
      ]]
      , date: ['', [
        Validators.required,

      ]]
      , time: ['']
    });


  }

  ngOnInit(): void {
    this.data = new Appointment();
    this.apmntForm.valueChanges.subscribe(
      val => {
        this.data.age = val.age;
        this.data.name = val.name;
        this.data.date = val.date;
        this.data.gender = val.gender;
        this.data.time = val.time;
        if (this.data.time) {
          debugger
          this.data.timeint = this.data.getTimeInt();
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  onCloseClick():void{
    this.dialogRef.close();
  }

  get name() {
    return this.apmntForm.get('name');
  }

  get age() {
    return this.apmntForm.get('age');
  }

  get gender() {
    return this.apmntForm.get('gender');
  }

  get date() {
    return this.apmntForm.get('date');
  }

  get time() {
    return this.apmntForm.get('time');
  }
}
