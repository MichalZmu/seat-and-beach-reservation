import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {AuthInterceptor} from './components/auth-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from './components/auth.guard';
import {AuthService} from '../services/auth.service';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ErrorInterceptor} from './components/error-interceptor';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, ErrorDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }],
  exports: [HeaderComponent]
})
export class SharedModule { }
