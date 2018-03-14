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
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {Http, RequestOptions} from "@angular/http";
import {AuthService} from "./auth/auth.service";
import { AuthGuardService } from './auth/auth-guard.service';
import {ScopeGuardService} from "./auth/scope-guard.service";


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

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
    MessageComponent,
    LoginComponent,
    ProfileComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,       // RouterModule hiányzik...azt is hozzá kell adni, hogy kezelni tudja a routokat.
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [  TimeloggerService,
                MessageService,
                AuthService,
                AuthGuardService,
                ScopeGuardService,  //Még nem használom
                {
                  provide: AuthHttp,
                  useFactory: authHttpServiceFactory,
                  deps: [Http, RequestOptions]
                },
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
