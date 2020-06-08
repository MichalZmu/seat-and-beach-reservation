import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../services/header.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  selectedStep = 1;

  constructor(private headerService: HeaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.headerService.getStep().subscribe(data => {
      this.selectedStep = data;
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login-form']);
  }

}
