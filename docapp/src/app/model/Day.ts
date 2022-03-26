import { Appointment } from "./Appointment";

export class Day {
    daynumber: number;
    appointments: Appointment[];
    constructor() {
        this.daynumber = 0;
        this.appointments = [];
    }
}