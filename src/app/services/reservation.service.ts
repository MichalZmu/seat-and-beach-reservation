import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationUpdated = new Subject<Reservation[]>();
  reservation: Reservation = {
    id: null,
    timeFrom: '',
    timeTo: '',
    date: '',
    seatNumber: '',
    userId: ''
  };
  reservations: Reservation[] = [];

  constructor(private http: HttpClient) { }

  addReservation(reservation: Reservation) {
    this.http.post<{ message: string, reservationId: string }>('http://localhost:3000/api/reservations', reservation).subscribe(responseData => {
      console.log(responseData.message);
      reservation.id = responseData.reservationId;
      this.reservations.push(reservation);
      this.reservationUpdated.next(this.reservations);
    });
  }

  setReservationDetails(timeFrom: any, timeTo: string, date: string, seatNumber: string) {
    this.reservation.timeFrom = timeFrom;
    this.reservation.timeTo = timeTo;
    this.reservation.date = date;
    this.reservation.seatNumber = seatNumber;
    this.reservation.userId = '2123sas';
    this.addReservation(this.reservation);
    console.log(this.reservation);
  }
}

export interface Reservation {
  id: string;
  timeFrom: string;
  timeTo: string;
  date: string;
  seatNumber: string;
  userId;

}
