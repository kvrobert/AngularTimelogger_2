import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MonthStatisticsComponent } from './month-statistics/month-statistics.component';
import { DayStatisticsComponent } from './day-statistics/day-statistics.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DinamicCalendarComponent } from './dinamic-calendar/dinamic-calendar.component';
import { DisplaysMonthComponent } from './displays-month/displays-month.component';
import { AppRoutingModule } from './/app-routing.module';
import {RouterModule} from '@angular/router';
import { DisplaysDaysComponent } from './displays-days/displays-days.component';
import { DisplaysTasksComponent } from './displays-tasks/displays-tasks.component';
import {TimeloggerService} from "./timelogger.service";
import {MessageService} from "./message.service";
import { MessageComponent } from './message/message.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    MonthStatisticsComponent,
    DayStatisticsComponent,
    CalendarComponent,
    DinamicCalendarComponent,
    DisplaysMonthComponent,
    DisplaysDaysComponent,
    DisplaysTasksComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,       // RouterModule hiányzik...azt is hozzá kell adni, hogy kezelni tudja a routokat.
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ TimeloggerService,
              MessageService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
