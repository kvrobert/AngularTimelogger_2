import { Component, OnInit } from '@angular/core';
import {WorkMonth} from '../Entity/work-month';
import {TimeloggerService} from "../timelogger.service";
import {WMontApis} from "../Interfaces/w-mont-apis";
import moment = require("moment");
import {LoaderService} from "../Services/loader.service";
import {MatSnackBar} from '@angular/material';

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

  constructor(private timeloggerService: TimeloggerService,
              private loader: LoaderService,
              public popUpBar: MatSnackBar) {
  }

  ngOnInit() {
   this.getWMontApis();
   console.log('ngOnInit from displayMonth');
    this.timeloggerService.currentCommonDateObs.subscribe( curCommDate => this.currentCommonDate = curCommDate );
  }

  getWMontApis( ): void {
    this.timeloggerService.getWMontApis()
      .subscribe(
        ( apis: WMontApis[]) => { // lehetne így is.... apis => ...stb.
        this.loader.loadingStart();
        this.workMonths = apis.map( workmonth => {  // Mappelni kell....és azt kapja vissza

            console.log("The date to parse: " + workmonth.monthDate);
            var date = Date.parse( workmonth.monthDate );
            var year = +moment( date).format('YYYY');
            var month = +moment( workmonth.monthDate ).format('MM');
            return new WorkMonth( year, month );
           });
        },
        error => {
          this.loader.loadingStop();
          this.timeloggerService.messageService.openPopUp( error.error );
        },
        () => this.loader.loadingStop()
      );
    console.log('GetMonth method from displayMonth');

  }

  deleteWorkMonth( wm: WorkMonth ){
    this.timeloggerService.deleteWorkMonth( wm )
      .subscribe(
        result => console.log("Az eredmény: " + JSON.stringify( result ) ),
        error => alert( error ),
        () => {
          console.log("HÓNAP Trörlve");
          this.timeloggerService.messageService.openPopUp( wm.year + wm.month
            + " Work Month deletion.... ", "Ok")
        }
      );
  }
}
