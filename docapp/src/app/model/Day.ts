import { Appointment } from "./Appointment";

export class Day {
    daynumber: number;
    appointments: Appointment[];
    constructor(d: number, a: Appointment[]) {
        this.daynumber = d;
        this.appointments = a;
    }
}