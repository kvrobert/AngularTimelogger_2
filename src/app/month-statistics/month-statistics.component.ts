import { Component, OnInit } from '@angular/core';
import {TimeloggerService} from "../timelogger.service";
import {WMontApis} from "../Interfaces/w-mont-apis";
import {WorkMonth} from "../Entity/work-month";
import moment = require("moment");

@Component({
  selector: 'app-month-statistics',
  templateUrl: './month-statistics.component.html',
  styleUrls: ['./month-statistics.component.css']       // ../app.component.css -css-sel
})
export class MonthStatisticsComponent implements OnInit {

  constructor( private timeloggerService: TimeloggerService) { }

  workMonths: WorkMonth[] = [];
  workMonthsAPI: WMontApis[] = [];
  year: string;
  month: string;
  currentCommonDate: Date;

  ngOnInit() {
    this.getWMontApis();
    console.log('ngOnInit from MONTHSTAT');
    this.timeloggerService.currentCommonDateObs.subscribe( curCommDate => this.currentCommonDate = curCommDate );
  }

  getWMontApis( ): void {
    this.timeloggerService.getWMontApis()
      .subscribe((apis: WMontApis[]) => { // lehetne így is.... apis => ...stb.
        this.workMonthsAPI = apis;
        this.workMonths = apis.map( workmonth => {  // Mappelni kell....és azt kapja vissza

          console.log("The date to parse: " + workmonth.monthDate);
          var date = Date.parse( workmonth.monthDate );
          var year = +moment( date).format('YYYY');
          var month = +moment( workmonth.monthDate ).format('MM');
          return new WorkMonth( year, month );
        });
      } );
    console.log('GetMonth method from MONTHSTAT');
  }

  getCurrentMOnthStatistic( year: number, month: number ): WMontApis {

      let yearMonth = year + "-" + month;
     for ( let i = 0; i < this.workMonthsAPI.length; i++){
       if( this.workMonthsAPI[i].monthDate == yearMonth ) { return  this.workMonthsAPI[i]; }
     }
    return {"monthDate":"9999-99","sumPerMonth":0,"requiredMinPerMonth":0,"extraMinPerMonth":0};
  }
}
