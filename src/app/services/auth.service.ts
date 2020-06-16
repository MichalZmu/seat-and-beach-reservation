import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import set = Reflect.set;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  private _token: string;
  private _authStatusListener = new Subject<boolean>();
  private _isAuthenicated = false;
  private _tokenTimer: any;
  authData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient,
              private router: Router) {
  }

  createUser(user: User): void {
    this.http.post('https://seat-and-beach.herokuapp.com/api/user/sign-up', user).subscribe(result => {
      console.log(result);
    });
  }

  login(email: string, password: string) {
    this.authData.email = email;
    this.authData.password = password;
    this.http.post<{ token: string, user: User, expiresIn: any}>('https://seat-and-beach.herokuapp.com/api/user/login', this.authData).subscribe(response => {
      this.user = response.user;
      this._token = response.token;
      if (this._token) {
        const expiresInDuration = response.expiresIn;
        this._setAuthTimer(expiresInDuration);
        this._isAuthenicated = true;
        this._authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this._saveAuthData(this._token, expirationDate);
        this.router.navigate(['/user-panel']);
      }
    });
  }

  get token(): string {
    return this._token;
  }

  get isAuth(): boolean {
    return this._isAuthenicated;
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
    this.router.navigate(['/']);
  }

  private _saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  private _clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  private getAuthData(): any {
    const fetchedToken = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!fetchedToken && !expirationDate) {
      return;
    }
    return {
      token: fetchedToken,
      expirationDate: new Date(expirationDate)
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    let expiresIn;
    if (!authInformation) {
      expiresIn = 0;
    } else {
      expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    }
    if (expiresIn > 0) {
      this._token = authInformation.token;
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
