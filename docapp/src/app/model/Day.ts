import { Appointment } from "./Appointment";

export class Day {
    daynumber: number;
    appointments: Appointment[];
    public Day() {
        this.daynumber = 0;
        this.appointments = [];
    }
}