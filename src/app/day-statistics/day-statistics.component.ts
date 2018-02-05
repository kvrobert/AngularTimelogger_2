import { Component, OnInit } from '@angular/core';
import {TimeloggerService} from "../timelogger.service";
import {WorkDay} from "../Entity/work-day";
import {WDayApis} from "../Interfaces/w-day-apis";
import {WMontApis} from "../Interfaces/w-mont-apis";

@Component({
  selector: 'app-day-statistics',
  templateUrl: './day-statistics.component.html',
  styleUrls: ['./day-statistics.component.css']         // ../app.component.    eredeti css az app-ból
})
export class DayStatisticsComponent implements OnInit {

  workDays: WorkDay[] = [];
  WDayApis: WDayApis[] = [];
  currentCommonDateDay: Date;


  constructor(private timeloggerService: TimeloggerService) {
  }

  ngOnInit() {

    this.timeloggerService.currentCommonDateObs.subscribe(curCommDate => this.currentCommonDateDay = curCommDate);
    this.getWorkDays();
    this.timeloggerService.workDayApiCommonOBS.subscribe(wdApiOBS => this.WDayApis = wdApiOBS);
    this.timeloggerService.changedworkDayApiCommon(this.WDayApis);
  }

  getWorkDays(): void {
    console.log("currentCommonDate from DAYSTATISTICS is " + this.currentCommonDateDay);
    const year = +this.currentCommonDateDay.getFullYear();
    const month = +this.currentCommonDateDay.getMonth() + 1;
    this.timeloggerService.getWorkDaysApis(year, month).subscribe(
      (apisWD: WDayApis[]) => {
        console.log("APISCUCCCCC from DaySTATISTICS" + apisWD);
        this.WDayApis = apisWD;
        this.workDays = apisWD.map(workday => { // itt a workday Az APIS Workday
          console.log("The dates: " + workday.WorkDay[0] + workday.WorkDay[1] + workday.WorkDay[2]);
          let year = workday.WorkDay[0];
          let month = workday.WorkDay[1];
          let day = workday.WorkDay[2];
          let reqMin = workday.requiredMinPerDay;
          return new WorkDay(year, month, day, reqMin);
        });
      }
    );
  }

  getCurrentDayStatistic(year: number, month: number, day: number): WDayApis {

    if ((typeof this.WDayApis) != "undefined") {     // A HTML előbb betöltődik, mint ez inicializálódna.
      // console.log("We search the date.." + year + "-"+month+"-" +day);
      for (let i = 0; i < this.WDayApis.length; i++) {
        if (this.WDayApis[i].WorkDay[0] == year &&
          this.WDayApis[i].WorkDay[1] == month &&
          this.WDayApis[i].WorkDay[2] == day) {
          return this.WDayApis[i];
        }
      }
    }
    return {"id": 0, "requiredMinPerDay": 0, "sumPerDay": 0, "extraMinPerDay": 0, "WorkDay": [1900, 11, 11]};
  }
}
