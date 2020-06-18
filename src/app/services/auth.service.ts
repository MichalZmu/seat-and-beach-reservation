import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  private _token: string;
  private _authStatusListener = new Subject<boolean>();
  private _isAuthenicated = false;
  private _tokenTimer: any;
  private _userId: string;
  authData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient,
              private router: Router) {
  }

  createUser(user: User): Observable<any> {
    return this.http.post('https://seat-and-beach.herokuapp.com/api/user/sign-up', user);
  }


  login(email: string, password: string) {
    this.authData.email = email;
    this.authData.password = password;
    this.http.post<{ token: string, userId: string, expiresIn: any}>('https://seat-and-beach.herokuapp.com/api/user/login', this.authData).subscribe(response => {
      this._userId = response.userId;
      this._token = response.token;
      if (this._token) {
        const expiresInDuration = response.expiresIn;
        this._setAuthTimer(expiresInDuration);
        this._isAuthenicated = true;
        this._authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this._saveAuthData(this._token, expirationDate, this._userId);
        this.router.navigate(['/user-panel']);
      }
    }, error => {
      this.router.navigate(['/login-form']);
    });
  }

  getCurrentUser(userId: string): Observable<any> {
    const httpParams = new HttpParams().set('userId', userId);
    return this.http.get('https://seat-and-beach.herokuapp.com/api/user/current-user', {params: httpParams});
  }

  get token(): string {
    return this._token;
  }

  get isAuth(): boolean {
    return this._isAuthenicated;
  }

  get userId(): string {
    return this._userId;
  }

  getAuthStatusListener(): any {
    return this._authStatusListener.asObservable();
  }

  logout() {
    this._token = null;
    this._isAuthenicated = false;
    this._authStatusListener.next(false);
    clearTimeout(this._tokenTimer);
    this._clearAuthData();
    this.user = null;
    this.router.navigate(['/']);
  }

  private _saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private _clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private _getAuthData(): any {
    const fetchedToken = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const fetchedUserId = localStorage.getItem('userId');
    if (!fetchedToken && !expirationDate && !fetchedUserId) {
      return;
    }
    return {
      token: fetchedToken,
      expirationDate: new Date(expirationDate),
      userId: fetchedUserId
    };
  }

  autoAuthUser() {
    const authInformation = this._getAuthData();
    const now = new Date();
    let expiresIn;
    if (!authInformation) {
      expiresIn = 0;
    } else {
      expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    }
    if (expiresIn > 0) {
      this._token = authInformation.token;
      this._userId = authInformation.userId;
      this._isAuthenicated = true;
      this._setAuthTimer(expiresIn / 1000);
      this._authStatusListener.next(true);
    }
  }

  private _setAuthTimer(duration: number) {
    this._tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

}
