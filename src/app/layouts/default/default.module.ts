import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../../modules/home/home.component';
import {UserDataStepComponent} from '../../modules/user-data-step/user-data-step.component';
import {PageNotFoundComponent} from '../../modules/page-not-found/page-not-found.component';
import {LoginOrReqistrationComponent} from '../../modules/login-or-reqistration/login-or-reqistration.component';
import {FormsModule} from '@angular/forms';
import {MustMatchDirective} from '../../modules/user-data-step/must-match.directive';

@NgModule({
  declarations: [DefaultComponent,
    HomeComponent,
    UserDataStepComponent,
    PageNotFoundComponent,
    LoginOrReqistrationComponent,
    MustMatchDirective],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class DefaultModule { }
