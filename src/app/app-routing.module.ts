import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaysMonthComponent } from './displays-month/displays-month.component';
import {DisplaysDaysComponent} from "./displays-days/displays-days.component";
import {DisplaysTasksComponent} from "./displays-tasks/displays-tasks.component";
import {LoginComponent} from "./login/login.component";
import {CallbackComponent} from "./callback/callback.component";


const routes: Routes = [
  { path: 'workmonths', component: DisplaysMonthComponent },
  { path: 'workdays', component: DisplaysDaysComponent }, // ez ki lesz véve...és csak a paraméteres lesz
  { path: 'workdays/year/day', component: DisplaysDaysComponent },
  { path: 'tasks', component: DisplaysTasksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
