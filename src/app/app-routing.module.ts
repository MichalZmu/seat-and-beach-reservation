import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {DefaultComponent} from './layouts/default/default.component';
import {PageNotFoundComponent} from './modules/page-not-found/page-not-found.component';
import {LoginOrRegistrationComponent} from './modules/login-or-reqistration/login-or-registration.component';
import {SummaryStepComponent} from './modules/summary-step/summary-step.component';
import {CreateNewUserComponent} from './modules/create-new-user/create-new-user.component';
import {ReservationComponent} from './modules/reservation/reservation.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [{
      path: '',
      component: HomeComponent
    },
      {
        path: 'login-form',
        component: LoginOrRegistrationComponent
      },
      {
        path: 'reservation',
        component: ReservationComponent
      },
      {
        path: 'summary',
        component: SummaryStepComponent
      },
      {
        path: 'create-new-user',
        component: CreateNewUserComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
