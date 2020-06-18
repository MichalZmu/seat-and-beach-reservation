import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {

    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      console.log(error.error.message);
      console.log(error.status);
      let dialogMessage;
      if (error.status === 500 && error.error.message === 'emailAlreadyExist') {
        dialogMessage = 'Ten adres email jest już w naszej bazie, proszę użyć innego lub zalogować się';
      } else if (error.status === 401 && error.error.message === 'IncorrectEmailOrPassword') {
        dialogMessage = 'Nieprawidłowy email i/lub hasło';
      } else {
        dialogMessage = 'Coś poszło nie tak, proszę spróbować jeszcze raz';
      }
      this.dialog.open(ErrorDialogComponent, {data: {message: dialogMessage}});
      return throwError(error.error.message ? error.error.message : error);

    }));
  }

}
