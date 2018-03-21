import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaysMonthComponent } from './displays-month/displays-month.component';
import {DisplaysDaysComponent} from "./displays-days/displays-days.component";
import {DisplaysTasksComponent} from "./displays-tasks/displays-tasks.component";
import {LoginComponent} from "./login/login.component";
import {CallbackComponent} from "./callback/callback.component";
import {ProfileComponent} from "./profile/profile.component";
import { ScopeGuardService as AuthGuard } from './auth/scope-guard.service';
import {MatSpinnerComponent} from "./mat-spinner/mat-spinner.component";


const routes: Routes = [
  { path: 'workmonths', component: DisplaysMonthComponent, canActivate: [ AuthGuard ] },
  { path: 'workdays', component: DisplaysDaysComponent, canActivate: [ AuthGuard ] }, // ez ki lesz véve...és csak a paraméteres lesz
  { path: 'workdays/year/day', component: DisplaysDaysComponent, canActivate: [ AuthGuard ] },
  { path: 'tasks', component: DisplaysTasksComponent, canActivate: [ AuthGuard ] },
 // { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
  { path: 'spinner', component: MatSpinnerComponent, canActivate: [ AuthGuard ] },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
