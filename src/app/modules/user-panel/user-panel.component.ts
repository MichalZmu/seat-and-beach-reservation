import { Component, OnInit } from '@angular/core';
import {Reservation, ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  reservations: Reservation[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getAllReservationsByUserId('111111').subscribe(data => {
      this.reservations = data;
    });
  }

}
