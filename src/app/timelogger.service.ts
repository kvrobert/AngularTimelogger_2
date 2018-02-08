import { Injectable } from '@angular/core';
import {WorkMonth} from "./Entity/work-month";
import {WorkDay} from "./Entity/work-day";
import  { Task } from  './Entity/task'
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WMontApis} from "./Interfaces/w-mont-apis";
import {WDayApis} from "./Interfaces/w-day-apis";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as moment from "moment";
import _date = moment.unitOfTime._date;
import {stringDistance} from "codelyzer/util/utils";
import {TaskApis} from "./Interfaces/task-apis";


@Injectable()
export class TimeloggerService {

 /* workMonths: WorkMonth[] = [
    {year: 2017, month: 10},
    {year: 2017, month: 11},
    {year: 2017, month: 12},
    {year: 2017, month: 9},
  ]; */

 /* workDays: WorkDay[] = [
    {year: 2017, month: 10, day: 11, requiredHour: 450},
    {year: 2017, month: 10, day: 12, requiredHour: 450},
    {year: 2017, month: 10, day: 13, requiredHour: 450},
    {year: 2017, month: 10, day: 14, requiredHour: 450},
    {year: 2017, month: 10, day: 15, requiredHour: 450},
    {year: 2017, month: 10, day: 16, requiredHour: 450},
    {year: 2017, month: 10, day: 17, requiredHour: 450},
    {year: 2017, month: 10, day: 18, requiredHour: 450},
  ]; */
/*
  tasks: Task[] = [
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'},
    { year: 2017, month: 10, day: 11, taskId: 'LT-4545', comment: 'Valami kommentelés', startTime: '10:15', endTime: '11:45'}

  ];*/

   urlGETWokmonths = 'http://localhost:8080/timelogger/workmonths/';
   urlGETWokDays = this.urlGETWokmonths;
   urlGetTasks = this.urlGETWokmonths;

   private WDApi: WDayApis[];
   private WMApi: WMontApis[];
   /** Synchronisiert the date between the component */
   private currentCommonDateSource = new BehaviorSubject< Date >( moment().toDate() );
   currentCommonDateObs = this.currentCommonDateSource.asObservable();
  /** Synchronisiert the WD APIS between the component */
   private worDayApiCommonSurce = new BehaviorSubject< WDayApis[] >( this.WDApi );
   workDayApiCommonOBS = this.worDayApiCommonSurce.asObservable();
  /** Synchronisiert the WM APIS between the component */
   private workMonthCommonSource = new BehaviorSubject< WMontApis[] >( this.WMApi );
   workMonthCommonOBS = this.workMonthCommonSource.asObservable();


  constructor( private messageService: MessageService,
                private  http: HttpClient) { }

  changeCurrentCommonDate( chanchedDate: Date ){
    this.currentCommonDateSource.next( chanchedDate );
  }

  changedworkDayApiCommon( chanchedWDayApi: WDayApis[] ){
    this.worDayApiCommonSurce.next( chanchedWDayApi );
  }
  changedworkMonthCommon( changedWMApi: WMontApis[] ){
    this.workMonthCommonSource.next( changedWMApi );
  }


   /** Get Workmonths from the server */
  /* getWorkMonths(): Observable< WorkMonth[] > {
    this.messageService.addMessage( 'WorkMonths fetched....' );
    return this.http.get<WorkMonth[]>( this.urlWokmonths );
  } */ // Test

  getWMontApis(): Observable< WMontApis[] > {
   // this.messageService.addMessage('WorkMonths fetched....');
    console.log('getApis from service');
    return this.http.get<WMontApis[]>(this.urlGETWokmonths);
  }

  getWorkDaysApis( year: number, month: number ): Observable<WDayApis[]> {
    console.log("GetWorkDayApi from Service");
    const URL = `${this.urlGETWokDays}${year}/${month}`;
    console.log( "Day request from..." + URL );
    return this.http.get<WDayApis[]>( URL );
  }

  getTasksAPIs( year: number, month: number, day: number ): Observable< TaskApis[] > {
    console.log("Task from ServiceAPI");
    const URL = `${this.urlGetTasks}${year}/${month}/${day}`;
    console.log("Task request form "+ URL);
    return this.http.get< TaskApis[] >( URL );
  }

  log(message: string):void {
    this.messageService.addLogMessage('Timelogger: ' + message);
  }
}
