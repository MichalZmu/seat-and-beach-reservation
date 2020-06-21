import { Component, OnInit } from '@angular/core';
import {Reservation, ReservationService} from '../../../services/reservation.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  reservation: Reservation;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservation = this.reservationService.reservation;
  }

}
