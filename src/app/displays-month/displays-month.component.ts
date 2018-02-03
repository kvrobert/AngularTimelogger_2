import { Component, OnInit } from '@angular/core';
import {WorkMonth} from '../Entity/work-month';
import {TimeloggerService} from "../timelogger.service";
import {WMontApis} from "../Interfaces/w-mont-apis";
import moment = require("moment");
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-displays-month',
  templateUrl: './displays-month.component.html',
  styleUrls: ['./displays-month.component.css']
})
export class DisplaysMonthComponent implements OnInit {

  private tableHeader: string[] = ['Year', 'Month', 'Edit', 'Delete'];
  workMonths: WorkMonth[] = [];
  workMonthsAPI: WMontApis[] = [];
  year: string;
  month: string;
  foo = moment();

  currentCommonDate: Date;

  constructor(private timeloggerService: TimeloggerService) {
  }

  ngOnInit() {
   this.getWMontApis();
   console.log('ngOnInit from displayMonth');
    this.timeloggerService.currentCommonDateObs.subscribe( curCommDate => this.currentCommonDate = curCommDate );
  }

  getWMontApis( ): void {
    this.timeloggerService.getWMontApis()
      .subscribe((apis: WMontApis[]) => { // lehetne így is.... apis => ...stb.
        this.workMonths = apis.map( workmonth => {  // Mappelni kell....és azt kapja vissza

            console.log("The date to parse: " + workmonth.monthDate);
            var date = Date.parse( workmonth.monthDate );
            var year = +moment( date).format('YYYY');
            var month = +moment( workmonth.monthDate ).format('MM');
            return new WorkMonth( year, month );
           });
      } );
    console.log('GetMonth method from displayMonth');

  };
                                                                             /* convertApiWorkMonthTOWorkMonth(): void {
                                                                                //this.workMonths = new WorkMonth()[];
                                                                                console.log( this.workMonthsAPI.length );

                                                                                for ( var i = 0; i < this.workMonthsAPI.length; i++ ){
                                                                                  console.log( "Enter into the loop" );
                                                                                     // this.workMonths[i].year = + moment( this.workMonthsAPI[i].monthDate, "YYYY" );   // + -> convert string to number
                                                                                     // this.workMonths[i].month = + moment( this.workMonthsAPI[i].monthDate, "MM" );
                                                                                  var date = Date.parse( this.workMonthsAPI[i].monthDate );
                                                                                  var y = +moment( date).format('YYYY');
                                                                                  var m = +moment( this.workMonthsAPI[i].monthDate ).format('MM');
                                                                                  console.log( typeof y );
                                                                                  console.log( typeof m );
                                                                                  this.workMonths[i].setYear( y );
                                                                                  this.workMonths[i].setMonth( m );
                                                                                };
                                                                              };*/

}
