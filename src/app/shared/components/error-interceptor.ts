import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {

    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      let dialogMessage;
      if (error.status === 500 && error.error.message === 'emailAlreadyExist') {
        dialogMessage = 'emailAlreadyExist';
      } else if (error.status === 401 && error.error.message === 'IncorrectEmailOrPassword') {
        this.router.navigate(['/login-form']);
        dialogMessage = 'IncorrectEmailOrPassword';
      } else {
        this.router.navigateByUrl('error');
        dialogMessage = 'somethingGoesWrong';
      }
      this.dialog.open(ErrorDialogComponent, {data: {message: dialogMessage}});
      return throwError(error.error.message ? error.error.message : error);
    }));
  }

}
