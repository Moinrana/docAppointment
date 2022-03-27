
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../model/Appointment';

@Component({
  selector: 'app-appointment-detaildialog',
  templateUrl: './appointment-detaildialog.component.html',
  styleUrls: ['./appointment-detaildialog.component.scss']
})
export class AppointmentDetaildialogComponent implements OnInit {
  currApmnt: Appointment;
  constructor(public dialogRef: MatDialogRef<AppointmentDetaildialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment) { }

  ngOnInit(): void {
    this.currApmnt = this.data;
  }

  onCloseClick():void{
    this.dialogRef.close();
  }

}
