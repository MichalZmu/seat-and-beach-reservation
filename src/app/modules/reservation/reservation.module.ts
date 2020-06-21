import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoosePlaceComponent } from './choose-place/choose-place.component';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {UserDataStepComponent} from './user-data-step/user-data-step.component';
import {MustMatchDirective} from '../../directives/must-match.directive';
import { ReservationComponent } from './reservation.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [ChoosePlaceComponent,
  UserDataStepComponent,
  MustMatchDirective,
  ReservationComponent,
  SummaryComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
  ],
  exports: [ChoosePlaceComponent,
  MustMatchDirective]
})
export class ReservationModule { }
