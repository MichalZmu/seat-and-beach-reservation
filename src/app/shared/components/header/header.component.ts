import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../../services/header.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  selectedStep = 1;
  isAuthenticated = false;
  currentUser: User;
  currentLang: any;
  allLanguages: any;

  constructor(private headerService: HeaderService,
              private router: Router,
              private authService: AuthService,
              private translateService: TranslateService) {
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
    if (localStorage.getItem('lang')) {
      this.currentLang = localStorage.getItem('lang');
      this.translateService.use(this.currentLang);
    } else {
      this.currentLang = this.translateService.defaultLang;
    }
    this.allLanguages = this.translateService.getLangs();
    console.log(this.allLanguages);
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

  changeLanguage(lang): void {
    this.translateService.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

}
