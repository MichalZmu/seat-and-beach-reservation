import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {DefaultComponent} from './layouts/default/default.component';
import {UserDataStepComponent} from './modules/user-data-step/user-data-step.component';
import {PageNotFoundComponent} from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',
    component: DefaultComponent,
    children: [{
      path: '',
      component: HomeComponent
    },
    {
      path: 'user-data',
      component: UserDataStepComponent
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
export class AppRoutingModule { }
