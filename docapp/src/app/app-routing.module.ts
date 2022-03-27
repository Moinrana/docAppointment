import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorScheduleComponent } from './doctor-schedule/doctor-schedule.component';

const routes: Routes = [
  { path: 'year/:y/month/:m', component: DoctorScheduleComponent },
  { path: '', component: DoctorScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
