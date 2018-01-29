import { Component, OnInit } from '@angular/core';
import {WorkDay} from "../Entity/work-day";
import {TimeloggerService} from "../timelogger.service";

@Component({
  selector: 'app-displays-days',
  templateUrl: './displays-days.component.html',
  styleUrls: ['./displays-days.component.css']
})
export class DisplaysDaysComponent implements OnInit {

  private workDayTableHeader: string[] = ['Year', 'Month', 'Day', 'Edit', 'Delete'];
  workDays: WorkDay[];

  constructor( private timeloggerService: TimeloggerService) { }

  ngOnInit() {
    this.getWorkDays();
  }
  getWorkDays(): void {
    this.workDays = this.timeloggerService.getWorkDays();
  }
}
