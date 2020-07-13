import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  numberOfColumns = 5;
  numberOfRows = 3;

  reservation: Reservation = {
    _id: null,
    dateFrom: null,
    dateTo: null,
    seatNumber: '',
    userId: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  };

  constructor(private http: HttpClient) {
  }

  addReservation(): Observable<any> {
    return this.http.post<{ message: string, reservationId: string }>('https://seat-and-beach.herokuapp.com/api/reservations', this.reservation);
  }

  getReservations(dateFrom, dateTo): Observable<Reservation[]> {
    const paramDateFrom = moment(dateFrom).startOf('day').toISOString();
    const paramDateTo = moment(dateTo).endOf('day').toISOString();
    const params = new HttpParams().set('dateFrom', paramDateFrom).set('dateTo', paramDateTo);
    return this.http.get<Reservation[]>('https://seat-and-beach.herokuapp.com/api/reservations', { params });
  }

  getAllReservationsByUserId(userId): Observable<Reservation[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Reservation[]>('https://seat-and-beach.herokuapp.com/api/reservations/user', { params});
  }

  set dateTo(value: string) {
    this.reservation.dateTo = value;
  }

  set dateFrom(value: string) {
    this.reservation.dateFrom = value;
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

  set id(value: string) {
    this.reservation._id = value;
  }
}

export interface Reservation {
  _id: string;
  dateFrom: string;
  dateTo: string;
  seatNumber: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
