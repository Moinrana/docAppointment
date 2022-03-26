export class Month {
    serial: number;
    name: String;

    constructor(s: number, n: String) {
        this.serial = s;
        this.name = n;
    }

    getAllMonths(): Month[] {
        let months: Month[] = [];
        for (let i = 0; i <= 11; i++) {
            let date = new Date(2020, i, 21);
            let shortMonth = date.toLocaleString('en-us', { month: 'short' });
            months.push(new Month(i + 1, shortMonth));
        }
        return months;
    }
}