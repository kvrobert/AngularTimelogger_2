  import { Component, OnInit } from '@angular/core';
  import {MatProgressSpinner} from '@angular/material';
import { TimeloggerService } from '../timelogger.service';

@Component({
  selector: 'app-mat-spinner',
  templateUrl: './mat-spinner.component.html',
  styleUrls: ['./mat-spinner.component.css']
})
export class MatSpinnerComponent implements OnInit {

  color = 'gray';
  mode = 'indeterminate';
  value = 50;
  isVisible: boolean = false;

  constructor( private timelogger: TimeloggerService ) { }

  ngOnInit(){

    this.isVisible = this.timelogger.getLoadingStatus();
  }
}
