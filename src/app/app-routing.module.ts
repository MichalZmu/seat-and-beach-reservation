import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {DefaultComponent} from './layouts/default/default.component';
import {PageNotFoundComponent} from './modules/page-not-found/page-not-found.component';
import {LoginOrRegistrationComponent} from './modules/login-or-reqistration/login-or-registration.component';
import {CreateNewUserComponent} from './modules/create-new-user/create-new-user.component';
import {ReservationComponent} from './modules/reservation/reservation.component';
import {UserPanelComponent} from './modules/user-panel/user-panel.component';
import {AuthGuard} from './shared/components/auth.guard';
import {RulesComponent} from './modules/rules/rules.component';
import {ContactComponent} from './modules/contact/contact.component';

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
        path: 'create-new-user',
        component: CreateNewUserComponent
      },
      {
        path: 'user-panel',
        component: UserPanelComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'rules',
        component: RulesComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
