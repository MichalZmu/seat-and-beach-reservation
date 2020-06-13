import { Component, OnInit } from  '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  step = 1;

  constructor() { }

  ngOnInit(): void {
  }

  stepChange(event) {
    this.step = event;
  }

}
