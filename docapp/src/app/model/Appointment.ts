import { Time } from "@angular/common";

export class Appointment {
    name: String;
    gender: String;
    age: number;
    date: Date;
    time: string;

    constructor() {
        this.name = '';
        this.gender = '';
        this.age = 0;
        this.date = new Date();
        this.time = new Date().getTime.toString();
    }
}