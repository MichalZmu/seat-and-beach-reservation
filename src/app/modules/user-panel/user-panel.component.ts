import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Reservation, ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserPanelComponent implements OnInit {
  reservations: Reservation[];
  user: User;
  isLoading = true;
  totalReservations: number;
  reservationsPerPage = 10;

  constructor(private reservationService: ReservationService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser(this.authService.userId).subscribe(user => {
      this.user = user;
      this.reservationService.getAllReservationsByUserId(this.user._id, String(this.reservationsPerPage), '0' ).subscribe(data => {
        this.reservations = data.reservations;
        this.totalReservations = data.maxReservations;
        this.isLoading = false;
      });
    });
  }

  onChangePage(pageData: PageEvent) {
    this.reservationService.getAllReservationsByUserId(this.user._id, String(this.reservationsPerPage), String(pageData.pageIndex)).subscribe(data => {
      this.reservations = data.reservations;
      this.totalReservations = data.maxReservations;
      this.isLoading = false;
    });
  }

}
