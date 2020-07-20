import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'seat-and-beach-reservation';
  constructor(private authService: AuthService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.translateService.addLangs(['en', 'pl']);
    this.translateService.setDefaultLang('pl');
  }
}
