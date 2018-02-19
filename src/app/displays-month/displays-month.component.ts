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

  private tableHeader: string[] = ['Year', 'Month', 'Delete'];
  workMonths: WorkMonth[] = [];
  workMonthsAPI: WMontApis[] = [];
  year: string;
  month: string;
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

  }

  deleteWorkMonth( wm: WorkMonth ){
    this.timeloggerService.deleteWorkMonth( wm )
      .subscribe(
        result => console.log("Az eredmény: " + JSON.stringify( result ) ),
        error => alert( error ),
        () => alert( "Deleting Workmonth " + wm.year + "-" + wm.month + "is complet" )
      );
  }
}
