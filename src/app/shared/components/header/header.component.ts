import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../../services/header.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  selectedStep = 1;
  isAuthenticated = false;
  currentUser: User;

  constructor(private headerService: HeaderService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuth;
    this.headerService.getStep().subscribe(data => {
      this.selectedStep = data;
    });
    this.authService.getAuthStatusListener().subscribe( data => {
      this.currentUser = this.authService.user;
      this.isAuthenticated = data;
      if (this.isAuthenticated) {
        this.authService.getCurrentUser(this.authService.userId).subscribe(data => {
          this.currentUser = data;
        });
      }
    });
    if (this.isAuthenticated) {
      this.authService.getCurrentUser(this.authService.userId).subscribe(data => {
        this.currentUser = data;
      });
    }
  }

  ngOnDestroy() {
    this.authService.getAuthStatusListener().unsubscribe();
  }

  goToLogin(): void {
    this.router.navigate(['/login-form']);
  }

  logout(): void {
    this.authService.logout();
  }

  goToUserPanel(): void {
    this.router.navigate(['/user-panel']);
  }

}
