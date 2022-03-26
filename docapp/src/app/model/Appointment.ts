
export class Appointment {
    name: String;
    gender: String;
    age: number;
    date: Date;
    time: string;
    timeint:number = 0;

    constructor() {
        this.name = '';
        this.gender = '';
        this.age = 0;
        this.date = new Date();
        this.time = new Date().getTime.toString();
    }

    getTimeInt(): number {
        let val = this.time.replace(':', '');
        return parseInt(val);
    }
}