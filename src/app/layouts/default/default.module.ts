import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../../modules/home/home.component';
import { ReservationModule } from 'src/app/modules/reservation/reservation.module';

@NgModule({
  declarations: [DefaultComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReservationModule
  ]
})
export class DefaultModule { }
