import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-statistics',
  templateUrl: './day-statistics.component.html',
  styleUrls: ['./day-statistics.component.css']         // ../app.component.    eredeti css az app-ból
})
export class DayStatisticsComponent implements OnInit {

  private requiredMinPerDay = 7.5 * 60;
  private sumPerDay = 555;
  private extraMinPerDay = 999;

  constructor() { }

  ngOnInit() {
  }

   public getRequiredMinPerDay(): number {
    return this.requiredMinPerDay;
   }

   public getSumPerDay(): number {
    return this.sumPerDay;
   }

  public getExtraMinPerDay(): number {
    return this.extraMinPerDay;
  }
}
