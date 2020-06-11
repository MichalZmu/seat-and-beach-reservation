import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  places = ['1a', '2a', '3a', '4a', '5a', '6a', '7a',
  '1b', '2b', '3b', '4b', '5b', '6b', '7b',
  '1c', '2c', '3c', '4c', '5c', '6c', '7c',
  '1d', '2d', '3d', '4d', '5d', '6d', '7d'];

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

  getReservations(dateFrom, dateTo): Observable<Reservation[]> {
    const params = new HttpParams().set('DateFrom', dateFrom.toISOString()).set('HourFrom', dateTo.toISOString());
    return this.http.get<Reservation[]>('https://seat-and-beach.herokuapp.com/api/reservations', { params });
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
