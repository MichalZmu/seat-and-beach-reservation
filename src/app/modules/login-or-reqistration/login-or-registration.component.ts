import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-or-registration',
  templateUrl: './login-or-registration.component.html',
  styleUrls: ['./login-or-registration.component.scss']
})
export class LoginOrRegistrationComponent implements OnInit {

  loginForm: FormGroup;
  email: string;
  password: string;
  submitted = false;
  formVal: any;
  isLoading = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  goToRegistrationForm(): void {
    this.router.navigateByUrl('/create-new-user');
  }

  onSubmit(): void {
    this.submitted = true;
    this.formVal = this.loginForm.value;
  }

  login(): void {
    if (this.loginForm.status !== 'INVALID') {
      this.isLoading = true;
      const loginResult = this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      if (!loginResult) {
        this.isLoading = false;
      }
    }
  }
}
