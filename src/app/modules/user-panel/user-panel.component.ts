import {Component, OnInit} from '@angular/core';
import {Reservation, ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  reservations: Reservation[];
  user: User;

  constructor(private reservationService: ReservationService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser(this.authService.userId).subscribe(user => {
      this.user = user;
      this.reservationService.getAllReservationsByUserId(this.user._id).subscribe(reservations => {
        this.reservations = reservations;
      });
    });
  }

}
