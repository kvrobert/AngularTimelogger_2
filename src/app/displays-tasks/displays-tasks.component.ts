import { Component, OnInit } from '@angular/core';
import { Task } from '../Entity/task';
import {TimeloggerService} from "../timelogger.service";

@Component({
  selector: 'app-displays-tasks',
  templateUrl: './displays-tasks.component.html',
  styleUrls: ['./displays-tasks.component.css']
})
export class DisplaysTasksComponent implements OnInit {

  private taskTableHeader: string[] = ['Task id', 'Year', 'Month', 'Comment', 'Sart Time', 'End Time', 'Edit', 'Delete'];

  tasks: Task[];

  constructor( private  timeloggerService: TimeloggerService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.tasks = this.timeloggerService.getTasks();
  }


}
