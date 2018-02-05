import { Component, OnInit } from '@angular/core';
import { Task } from '../Entity/task';
import {TimeloggerService} from "../timelogger.service";
import {TaskApis} from "../Interfaces/task-apis";

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
             let id = task.id.toString();
             let comment = task.comment.toString();
             let startTime = task.startTime.toString();
             let endTIme = task.endTime.toString();

             return new Task( year, month, day, id, comment, startTime, endTIme );
           }
         );
       }
     );
  }


}
