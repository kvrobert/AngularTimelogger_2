import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month-statistics',
  templateUrl: './month-statistics.component.html',
  styleUrls: ['./month-statistics.component.css']       // ../app.component.css -css-sel
})
export class MonthStatisticsComponent implements OnInit {

  constructor() { }

  private requiredMinPerMonth = 15;
  private sumPerMonth = 1500;
  private extraMinPerMonth = 0;


  ngOnInit() {
  }

  public getRequiredMinPerMonth(): number{
    return this.requiredMinPerMonth;
  }

  public getSumPerMonth(): number{
    return this.sumPerMonth;
  }

  public getExtraMinPerMonth(): number{
    return this.extraMinPerMonth;
  }
}
