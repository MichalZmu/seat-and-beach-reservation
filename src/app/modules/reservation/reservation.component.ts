import { Component, OnInit } from  '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  step = 1;
  loggedUser = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.isAuth;
  }

  stepChange(event) {
    this.step = event;
  }

}
