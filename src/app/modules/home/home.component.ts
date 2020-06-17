import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuth;
    this.authService.getAuthStatusListener().subscribe(data => {
      this.isAuthenticated = data;
    });
  }

  nextStep(type: 'reservation' | 'withoutReservation'): void {
    if (type === 'reservation') {
      this.router.navigateByUrl('/reservation');
    }
    else {
      this.router.navigateByUrl('/login-form');
    }
  }

}
