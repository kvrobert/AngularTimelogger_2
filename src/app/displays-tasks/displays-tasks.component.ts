import { Component, OnInit, Directive, forwardRef,Attribute,OnChanges, SimpleChanges,Input } from '@angular/core';
import { Task } from '../Entity/task';
import {TimeloggerService} from "../timelogger.service";
import {TaskApis} from "../Interfaces/task-apis";
import moment = require("moment");
import {TaskForModifi} from "../Entity/task-for-modifi";
import { getLocaleTimeFormat } from '@angular/common/src/i18n/locale_data_api';
import {ActivatedRoute, Router} from "@angular/router";
import {DinamicCalendarComponent} from "../dinamic-calendar/dinamic-calendar.component";
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import {LoaderService} from "../Services/loader.service";


@Component({
  selector: 'app-displays-tasks',
  templateUrl: './displays-tasks.component.html',
  styleUrls: ['./displays-tasks.component.css']
})
export class DisplaysTasksComponent implements OnInit {

  private taskTableHeader: string[] = ['Task id', 'Year', 'Month', 'Day', 'Comment', 'Sart Time', 'End Time', '', ' '];

  tasks: Task[];
  tasksAPI: TaskApis[];
  currentCommonDate: Date;
  router: Router;

  newRow: Task;
  selectedTask: Task;

  modifiedTask: TaskForModifi;


  /** to the editable table  */
  private editableTaskId: string;
  private editableTaskStartTime: string;
  private isNewRowAddingVisible  = false;


  constructor( private  timeloggerService: TimeloggerService,
               private loader: LoaderService) { }

  ngOnInit() {
    this.timeloggerService.currentCommonDateObs.subscribe( curCommDate => this.currentCommonDate = curCommDate );
    this.getTasks();
    this.modifiedTask = new TaskForModifi();
  }

  getTasks(): void {
   console.log("Hello from DisplayTask getTask");
   let year = + this.currentCommonDate.getFullYear();
   let month = + this.currentCommonDate.getMonth() + 1;
   let day = + this.currentCommonDate.getDate();

   this.timeloggerService.getTasksAPIs( year, month, day )
     .subscribe(
       ( taskAPI: TaskApis[] ) => {
         this.loader.loadingStart();
         this.tasks = taskAPI.map( task => {
             let id = task.taskID.toString();
             let comment = task.comment.toString();
             let startTime = this.convertDigits( task.startTime );                             //task.startTime.toString();
             let endTIme = this.convertDigits( task.endTime );                                //task.endTime.toString();
             return new Task( year, month, day, id, comment, startTime, endTIme );
           }
         );
       },
       error => this.loader.loadingStop(),
       () => this.loader.loadingStop()
     );
  }

  editRow(task: Task): void {
    console.log("EdiRow..." + task.taskId +";"+ task.startTime);
    this.selectedTask = task;

    /**  Add the old task data */
    this.modifiedTask.year = task.year;
    this.modifiedTask.month = task.month;
    this.modifiedTask.day = task.day;
    this.modifiedTask.taskId = task.taskId;
    this.modifiedTask.startTime = task.startTime;
  }

  editCancel( task: Task ): void {
    this.selectedTask = null;
  }

  saveRowEdition( tsk: Task ): void {
    this.selectedTask = null;

    this.modifiedTask.newTaskId = tsk.taskId;
    this.modifiedTask.newComment = tsk.comment;
    this.modifiedTask.newStartTime = tsk.startTime;
    this.modifiedTask.newEndTime = tsk.endTime;

    console.log( "The new task Data.." + tsk.taskId + ":"  + tsk.day + "-" + tsk.startTime +"-" + tsk.endTime );

    this.timeloggerService.modifyTask( this.modifiedTask )
    .subscribe(
      result => this.result( result ),
      error => this.error( error ),
      () => this.finally()
      );
  }

  addNewTaskRow(): void   {
    this.newRow = new Task( this.currentCommonDate.getFullYear(),
                            this.currentCommonDate.getMonth() + 1,
                            this.currentCommonDate.getDate(),
                            "", "", "", "");
    this.isNewRowAddingVisible = !this.isNewRowAddingVisible;
  }

  saveNewTask(): void {
    this.isNewRowAddingVisible = false;
    this.timeloggerService.addNewTask( this.newRow )
      .subscribe(
        result => this.result( result ),
        error => this.error( error ),
        () => this.finally()
      );


  }

  deleteRow( task: Task ): void {
    this.timeloggerService.deleteTask( task )
       .subscribe(
         result => this.result( result ),
         error => this.error( error ),
         () => this.finally()
       );



    this.editableTaskId = task.taskId;
    this.editableTaskStartTime = task.startTime;
  }

  cancelNewTask(): void {
    this.isNewRowAddingVisible = false;
    this.newRow = null;
  }

  convertDigits( number: number[] ): string {
    let hour;
    let minute;
    if ( number[0] < 10 ){
      hour = this.toTwoDigits( number[0] )
    }
    else {
      hour = number[0];
    }
    if( number[1] < 10 ){
      minute = this.toTwoDigits( number[1] )
    }
    else {
      minute = number[1];
    }
    return "" + hour + ":" + minute;
  }

  toTwoDigits(digit: number ): string {
    return "0" + digit;
  }

  result( responsType: any ) {
      console.log( 'The response: ' + JSON.stringify( responsType ) );
      this.loader.loadingStart();
  }

  error( responsType: any ) {
    console.log( 'The response: ' + JSON.stringify( responsType ) );
    this.loader.loadingStop();
  }

  finally() {
    console.log( 'The function complet. ' );
    this.loader.loadingStop();
  }

}
