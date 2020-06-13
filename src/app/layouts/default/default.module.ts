import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../../modules/home/home.component';
import {PageNotFoundComponent} from '../../modules/page-not-found/page-not-found.component';
import {LoginOrRegistrationComponent} from '../../modules/login-or-reqistration/login-or-registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReservationModule } from 'src/app/modules/reservation/reservation.module';
import {SummaryStepComponent} from '../../modules/summary-step/summary-step.component';
import {CreateNewUserComponent} from '../../modules/create-new-user/create-new-user.component';

@NgModule({
  declarations: [DefaultComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginOrRegistrationComponent,
    SummaryStepComponent,
    CreateNewUserComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReservationModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule]
})
export class DefaultModule { }
