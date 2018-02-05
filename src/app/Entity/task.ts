export class Task {

  year: number;
  month: number;
  day: number;
  taskId: string;
  comment: string;
  startTime: string;
  endTime: string;

  constructor(year: number,
              month: number,
              day: number,
              taskId: string,
              comment: string,
              startTime: string,
              endTime: string) {

    this.year = year;
    this.month = month;
    this.day = day;
    this. taskId = taskId;
    this.comment = comment;
    this.startTime = startTime;
    this.endTime = endTime;

  }
}
