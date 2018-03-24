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
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token-interceptor';
import {MatProgressSpinnerModule } from '@angular/material';
import { MatSpinnerComponent } from './mat-spinner/mat-spinner.component';
import {LoaderService} from "./Services/loader.service";


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
    CallbackComponent,
    MatSpinnerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,       // RouterModule hiányzik...azt is hozzá kell adni, hogy kezelni tudja a routokat.
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,

  ],
  providers: [  TimeloggerService,
                MessageService,
                AuthService,
                AuthGuardService,
                LoaderService,
                ScopeGuardService,  //Még nem használom
                     {
                        provide: HTTP_INTERCEPTORS,
                        useClass: TokenInterceptor,
                        multi: true
                      }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
