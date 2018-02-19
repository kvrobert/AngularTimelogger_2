import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {TimeloggerService} from "../timelogger.service";
import {WDayApis} from "../Interfaces/w-day-apis";
import {WMontApis} from "../Interfaces/w-mont-apis";
import {WorkDay} from "../Entity/work-day";

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-dinamic-calendar',
  templateUrl: './dinamic-calendar.component.html',
  styleUrls: ['./dinamic-calendar.component.css']
})
export class DinamicCalendarComponent implements OnInit {
  // Ha nem megy így létrehozk egy currentDatet---és a ngOnChangeban változtatom....
  currentDate = moment();
  dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  currentCommonDate: Date;

  private WDApi: WDayApis[];
  private WMApi: WMontApis[];
  private WDs: WorkDay[] = null;
  private activeDays: number[];

  constructor( private timeloggerService: TimeloggerService ) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.timeloggerService.currentCommonDateObs.subscribe( curCommDate => this.currentCommonDate = curCommDate );
    this.timeloggerService.workDayApiCommonOBS.subscribe( wdApiOBS => this.WDApi = wdApiOBS );
    this.timeloggerService.workMonthCommonOBS.subscribe( wmApiOBS => this.WMApi = wmApiOBS );
    this.timeloggerService.workDayCommonOBS.subscribe( wdays => this.WDs = wdays );
    this.changedWDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
      this.timeloggerService.workDayCommonOBS.subscribe( wdays => this.WDs = wdays );
    }
  }

  // date checkers
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
        return moment(date).isSame(selectedDate.mDate, 'day');
      }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }

  // actions from calendar
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
    this.changedWDate();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
    this.changedWDate();

  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
    this.changedWDate();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
    this.changedWDate();
  }

  // generate the calendar grid
  generateCalendar(): void {

    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;

/** Change the current Date to use it in other components**/
    this.timeloggerService.changeCurrentCommonDate( this.currentDate.toDate() );
    this.timeloggerService.workDayCommonOBS.subscribe( wdays => this.WDs = wdays );
   // console.log( "Date change.....to..." + this.currentDate.toDate() );

  }

  public getCurrentMonth(): number {
    return this.currentDate.month();
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day() - 1; /* Magyar naptár miatt..amúgy a Su a hét első napja */
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          mDate: d,
        };
      });
  }

  setCurrentCommonDate( date: Date ): void {
    this.currentCommonDate = date
    // console.log( date);
    this.timeloggerService.changeCurrentCommonDate( this.currentCommonDate );
   // console.log( "Date change.....to..." + this.currentCommonDate );
  }

  getWorkDays(): void {
    console.log("currentCommonDate from DynamicCALENDAR is " + this.currentCommonDate);
    const year = +this.currentCommonDate.getFullYear();
    const month = +this.currentCommonDate.getMonth() + 1;
    this.timeloggerService.getWorkDaysApis(year, month).subscribe(
      (apisWD: WDayApis[]) => {
        console.log("APISCUCCCCC from DynamicCALENDAR" + apisWD);
        this.WDApi = apisWD;
        this.WDs = apisWD.map(workday => { // itt a workday Az APIS Workday
          console.log("The dates: " + workday.WorkDay[0] + workday.WorkDay[1] + workday.WorkDay[2]);
          let year = workday.WorkDay[0];
          let month = workday.WorkDay[1];
          let day = workday.WorkDay[2];
          let reqMin = workday.requiredMinPerDay;
          return new WorkDay(year, month, day, reqMin);
        });
        this.timeloggerService.changedworkDayApiCommon( this.WDApi );
      }
    );
  }

  changedWDate(): void {
    this.getWorkDays();

  }

  isContainTaskData( date ): boolean {
    let isContaindata = false;
    if( this.WDs != null ){
      for( let day of this.WDs  ){
        if( moment(moment(date), 'day').isSame( day.day ) ) { isContaindata = true; }
      }
    return isContaindata;
  }else return false;
  }



  /*isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }*/

}


