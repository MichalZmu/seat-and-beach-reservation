import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {

    const authToken = this.authService.token;
    let authRequest;
    console.log(authToken);
    if (authToken) {
      authRequest = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
      return next.handle(authRequest);
    }
    console.log(authToken);
    return next.handle(req);
  }
}
