  import { Component, OnInit } from '@angular/core';
  import {MatProgressSpinner} from '@angular/material';

@Component({
  selector: 'app-mat-spinner',
  templateUrl: './mat-spinner.component.html',
  styleUrls: ['./mat-spinner.component.css']
})
export class MatSpinnerComponent {

  color = 'gray';
  mode = 'indeterminate';
  value = 50;

  constructor() { }


}
