import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ReservationService, Reservation } from '../../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-place',
  templateUrl: './choose-place.component.html',
  styleUrls: ['./choose-place.component.scss']
})
export class ChoosePlaceComponent implements OnInit {

  dataChoosed: boolean;
  reservationDateFrom: Date;
  reservationDateTo: Date;
  selectedSeat: string;
  places = [];
  reservations: Reservation[];
  @Output() currentStepChange = new EventEmitter<number>();

  constructor(
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.places = this.reservationService.places;
  }

  isDataChoosed(): void {
    if (this.reservationDateFrom && this.reservationDateTo) {
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
    this.currentStepChange.emit(2);
  }
}
