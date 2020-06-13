import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(private http: HttpClient) { }

  createUser(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/user/sing-up', this.user);
  }
}
