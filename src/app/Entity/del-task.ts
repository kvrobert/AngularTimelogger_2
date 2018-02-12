export class DelTask {
  year: number;
  month: number;
  day: number;
  taskId: string;
  startTime: string;

  constructor(year: number,
              month: number,
              day: number,
              taskId: string,
              startTime: string) {

    this.year = year;
    this.month = month;
    this.day = day;
    this.taskId = taskId;
    this.startTime = startTime;
  }
}
