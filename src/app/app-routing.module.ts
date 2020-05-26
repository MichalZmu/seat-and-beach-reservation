import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {DefaultComponent} from './layouts/default/default.component';

const routes: Routes = [
  { path: '',
    component: DefaultComponent,
    children: [{
      path: '',
      component: HomeComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
