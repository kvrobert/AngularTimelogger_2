import { Component, OnInit } from '@angular/core';
import { Task } from '../Entity/task';
import {TimeloggerService} from "../timelogger.service";
import {TaskApis} from "../Interfaces/task-apis";
import moment = require("moment");
import {TaskForModifi} from "../Entity/task-for-modifi";


@Component({
  selector: 'app-displays-tasks',
  templateUrl: './displays-tasks.component.html',
  styleUrls: ['./displays-tasks.component.css']
})
export class DisplaysTasksComponent implements OnInit {

  private taskTableHeader: string[] = ['Task id', 'Year', 'Month', 'Day', 'Comment', 'Sart Time', 'End Time', 'Edit', 'Delete'];

  tasks: Task[];
  tasksAPI: TaskApis[];
  currentCommonDate: Date;

  newRow: Task;
  modifiedTask: TaskForModifi;


  /** to the editable table  */
  private editableTaskId: string;
  private editableTaskStartTime: string;
  private isNewRowAddingVisible: boolean = false;


  constructor( private  timeloggerService: TimeloggerService) { }

  ngOnInit() {

    this.timeloggerService.currentCommonDateObs.subscribe( curCommDate => this.currentCommonDate = curCommDate );
    this.getTasks();
  }

  getTasks(): void {
   console.log("Hello from DisplayTask getTask");
   let year = + this.currentCommonDate.getFullYear();
   let month = + this.currentCommonDate.getMonth() + 1;
   let day = + this.currentCommonDate.getDate();

   this.timeloggerService.getTasksAPIs( year, month, day )
     .subscribe(
       ( taskAPI: TaskApis[] ) => {
         this.tasks = taskAPI.map( task => {
             let id = task.taskID.toString();
             let comment = task.comment.toString();
             let startTime = task.startTime.toString();
             let endTIme = task.endTime.toString();
             return new Task( year, month, day, id, comment, startTime, endTIme );
           }
         );
       }
     );
  }

  editRow(taskId: string, startTime: string): void {
    console.log("EdiRow..." + taskId +";"+ startTime);
    this.editableTaskId = taskId;
    this.editableTaskStartTime = startTime;
  }
  editCancel(): void{
    this.editableTaskId = "";
    this.editableTaskStartTime = "";
  }

  // TODO
  saveRowEdition( tsk: Task ): void {
    console.log( "New task Data.." + tsk.taskId + ":"  + tsk.day + tsk.startTime +"-" + tsk.endTime );
    this.editableTaskId = "";
    this.editableTaskStartTime = "";

  }

  // TODO
  addNewTaskRow(): void   {
    this.newRow = new Task( this.currentCommonDate.getFullYear(),
                            this.currentCommonDate.getMonth() + 1,
                            this.currentCommonDate.getDate(), "", "", "", "");
    this.isNewRowAddingVisible = !this.isNewRowAddingVisible;
  }

  deleteRow(taskId: string, startTime: string): void {
    this.editableTaskId = taskId;
    this.editableTaskStartTime = startTime;
  }

  saveNewTask(): void {
    this.timeloggerService.addNewTask( this.newRow )
      .subscribe(
          result => console.log( 'Az eredmény: ' + JSON.stringify( result ) ),
          error => alert( "Monething went wrong..." + error ),
        () => console.log( "Finished" )
      );

    this.isNewRowAddingVisible = false;
  }

  cancelNewTask(): void {
    this.isNewRowAddingVisible = false;
    this.newRow = null;
  }

}
