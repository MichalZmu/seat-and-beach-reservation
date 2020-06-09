import {Injectable} from '@angular/core';
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
    userId: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  };
  reservations: Reservation[] = [];

  constructor(private http: HttpClient) {
  }

  addReservation() {
    this.http.post<{ message: string, reservationId: string }>('https://seat-and-beach.herokuapp.com/api/reservations', this.reservation).subscribe(responseData => {
      console.log(responseData.message);
      this.reservation.id = responseData.reservationId;
      this.reservations.push(this.reservation);
      this.reservationUpdated.next(this.reservations);
      this.reservation = null;
    });
  }

  set timeFrom(value: string) {
    this.reservation.timeFrom = value;
  }

  set timeTo(value: string) {
    this.reservation.timeTo = value;
  }

  set date(value: string) {
    this.reservation.date = value;
  }

  set seatNumber(value: string) {
    this.reservation.seatNumber = value;
  }

  set userId(value: string) {
    this.reservation.userId = value;
  }

  set firstName(value: string) {
    this.reservation.firstName = value;
  }

  set lastName(value: string) {
    this.reservation.lastName = value;
  }

  set email(value: string) {
    this.reservation.email = value;
  }

  set phoneNumber(value: string) {
    this.reservation.phoneNumber = value;
  }
}

export interface Reservation {
  id: string;
  timeFrom: string;
  timeTo: string;
  date: string;
  seatNumber: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
