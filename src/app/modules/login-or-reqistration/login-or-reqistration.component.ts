import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-or-reqistration',
  templateUrl: './login-or-reqistration.component.html',
  styleUrls: ['./login-or-reqistration.component.scss']
})
export class LoginOrReqistrationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToRegistrationForm(): void {
    this.router.navigateByUrl('/user-data');
  }

}
