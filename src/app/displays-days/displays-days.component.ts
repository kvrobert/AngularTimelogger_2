import { Component, OnInit } from '@angular/core';
import {WorkDay} from "../Entity/work-day";
import {TimeloggerService} from "../timelogger.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {WDayApis} from "../Interfaces/w-day-apis";
import {LoaderService} from "../Services/loader.service";

@Component({
  selector: 'app-displays-days',
  templateUrl: './displays-days.component.html',
  styleUrls: ['./displays-days.component.css']
})
export class DisplaysDaysComponent implements OnInit {

  private workDayTableHeader: string[] = ['Year', 'Month', 'Day', 'Required work minutes', 'Delete'];
  workDays: WorkDay[];
  WDayApis: WDayApis[];

  currentCommonDateDay: Date;

  constructor( private timeloggerService: TimeloggerService,
               private loader: LoaderService ) { }

  ngOnInit() {
    this.timeloggerService.currentCommonDateObs.subscribe( curCommDate => this.currentCommonDateDay = curCommDate );
    this.getWorkDays();

  }

  getWorkDays(): void {
    this.workDays = null;
    console.log( "currentCommonDate from DisplaysMonth is " + this.currentCommonDateDay );
    const year = +this.currentCommonDateDay.getFullYear();
    const month = +this.currentCommonDateDay.getMonth()+1;
    this.timeloggerService.getWorkDaysApis( year, month )
      .subscribe(
        ( apisWD: WDayApis[] ) => {
          this.loader.loadingStart();
            this.workDays = apisWD.map( workday => { // itt a workday Az APIS Workday
            console.log("The dates: " + workday.WorkDay[0] + workday.WorkDay[1] + workday.WorkDay[2]);
            let year = workday.WorkDay[0];
            let month = workday.WorkDay[1];
            let day = workday.WorkDay[2];
            let reqMin = workday.requiredMinPerDay;
            return new WorkDay( year, month, day, reqMin );
          } )
          this.timeloggerService.changedWorkDayCommon( this.workDays );
        },
        error => this.loader.loadingStop(),
        () => this.loader.loadingStop()
    );
  }

  deleteWorkday( wd: WorkDay ) {
    this.timeloggerService.deleteWorkDay( wd )
      .subscribe(
        result => console.log("Az eredmény: " + JSON.stringify( result ) ),
        error => alert( error ),
       // () => alert( "Deleting WorkDay " + wd.year + "-" + wd.month + "-" + wd.day + " is complet" )
        () => this.timeloggerService.messageService.openPopUp( wd.year + wd.month + wd.day
          + " Work Day deletion.... ", "Ok")
      );
  }
}
