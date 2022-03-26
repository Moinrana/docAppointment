import { Injectable } from '@angular/core';
import { Appointment } from './model/Appointment';
declare let db: any;
@Injectable({
  providedIn: 'root'
})
export class LstorageService {
  public storageName = "idbdapp";
  constructor() { }

  // add(value: Appointment, keyname: string) {
  //   return new Promise(async (resolve, reject) => {
  //     if (db !== undefined) {
  //       const request = await db.transaction([this.storageName.toString()], 'readwrite')
  //         .objectStore(this.storageName)
  //         .put(value, keyname);
  //       request.onsuccess = await function (event: any) {
  //         if (event.target.result) {
  //           console.log("successfully stored on indexeddb");
  //           return resolve('success');
  //         } else {
  //           console.log("failed to store on indexeddb");
  //           return resolve(false);
  //         }
  //       }
  //     }
  //   })

  // }

  // getAll(keyname: string) {
  //   return new Promise(async (resolve, reject) => {
  //     if (db !== undefined) {
  //       const request = await db.transaction([this.storageName], "readwrite")
  //         .objectStore(this.storageName)
  //         .get(keyname);
  //       request.onsuccess = await function (event: any) {
  //         if (event.target.result) {
  //           console.log("successfully stored on indexeddb");
  //           return resolve('success');
  //         } else {
  //           console.log("failed to store on indexeddb");
  //           return resolve(false);
  //         }
  //       }
  //     }
  //   })

  // }


  add(value: Appointment, keyname: String) {
    let appointments: Appointment[] = [];
    let val = localStorage.getItem(keyname.toString());
    if (val !== null) {
      appointments = JSON.parse(val);
      appointments = [value, ...appointments]
    }
    else {
      appointments = [value];
    }
    localStorage.setItem(keyname.toString(), JSON.stringify(appointments));
  }

  get(keyname: String): Appointment[] {
    let appointments: Appointment[] = [];
    let val = localStorage.getItem(keyname.toString());
    if (val !== null) {
      appointments = JSON.parse(val);
    }
    return appointments.sort((a, b) => a.timeint - b.timeint);
  }

}
