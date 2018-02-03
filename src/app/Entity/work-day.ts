export class WorkDay {

  year: number;
  month: number;
  day: number;
  requiredHour: number;

  constructor(year: number, month: number, day: number, requiredHour: number = 500  ){
    this.year = year;
    this.month = month;
    this.day = day;
    this.requiredHour = requiredHour;
  }
}
