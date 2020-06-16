import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {AuthInterceptor} from './components/auth-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from './components/auth.guard';
import {AuthService} from '../services/auth.service';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }],
  exports: [HeaderComponent]
})
export class SharedModule { }
