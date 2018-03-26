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
import {AuthService} from "./auth/auth.service";
import { AuthGuardService } from './auth/auth-guard.service';
import {ScopeGuardService} from "./auth/scope-guard.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token-interceptor';
import {MatProgressSpinnerModule } from '@angular/material';
import { MatSpinnerComponent } from './mat-spinner/mat-spinner.component';
import {LoaderService} from "./Services/loader.service";
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';


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
    SnackBarComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatButtonModule

  ],
  providers: [  TimeloggerService,
                MessageService,
                AuthService,
                AuthGuardService,
                LoaderService,
                ScopeGuardService,  // I'm not using yet...
                     {
                        provide: HTTP_INTERCEPTORS,
                        useClass: TokenInterceptor,
                        multi: true
                      },
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
