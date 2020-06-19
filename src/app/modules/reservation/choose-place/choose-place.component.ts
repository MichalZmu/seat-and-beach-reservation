import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ReservationService, Reservation } from '../../../services/reservation.service';
import * as moment from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatDateFormats} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-choose-place',
  templateUrl: './choose-place.component.html',
  styleUrls: ['./choose-place.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ChoosePlaceComponent implements OnInit {

  beachWidth: string;
  dataChoosed: boolean;
  reservationDateFrom: Date;
  reservationDateTo: Date;
  selectedSeat: string;
  places = [];
  numberOfColumns: number;
  numberOfRows: number;
  reservations: Reservation[];
  @Output() currentStepChange = new EventEmitter<number>();

  constructor(
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.numberOfColumns = this.reservationService.numberOfColumns;
    this.numberOfRows = this.reservationService.numberOfRows;
    this.beachWidth = this.numberOfColumns * 60 + this.numberOfColumns * 10 + 'px';
    for ( let i = 0; i < this.numberOfColumns; i++) {
      for (let j = 1; j <= this.numberOfRows; j++) {
        this.places.push(j + this.returnColumn(i));
      }
    }
  }

  returnColumn(column): string {
    if (column >= 26) {
      column = column % 26;
    }
    const chr = String.fromCharCode(97 + column);
    return chr;
  }

  isDataChoosed(): void {
    if (this.reservationDateFrom && this.reservationDateTo) {
      console.log(this.reservationDateTo, this.reservationDateFrom);
      this.dataChoosed = true;
      this.reservationService.getReservations(this.reservationDateFrom, this.reservationDateTo).subscribe(data => {
        this.reservations = data;
      });
    }
  }

  choosePlace(seat): void {
    if (this.isPlaceAvaiable(seat)) {
      this.selectedSeat = seat;
    }
  }

  isPlaceAvaiable(seat): boolean {
    let isAvaiable = true;
    if (this.reservations) {
      this.reservations.forEach(element => {
        if (element.seatNumber === seat) {
          isAvaiable = false;
        }
      });
      return isAvaiable;
  }
}

  nextStep(): void {
    this.reservationService.seatNumber = this.selectedSeat;
    this.reservationService.dateFrom = moment(this.reservationDateFrom).startOf('day').toISOString();
    this.reservationService.dateTo = moment(this.reservationDateTo).endOf('day').toISOString();
    this.currentStepChange.emit(2);
  }
}
