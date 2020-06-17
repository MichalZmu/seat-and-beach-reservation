import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ReservationService, Reservation } from '../../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-place',
  templateUrl: './choose-place.component.html',
  styleUrls: ['./choose-place.component.scss']
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
    this.reservationService.dateFrom = this.reservationDateFrom.toISOString();
    this.reservationService.dateTo = this.reservationDateTo.toISOString();
    this.currentStepChange.emit(2);
  }
}
