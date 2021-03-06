import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {catchError} from 'rxjs/operators';

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
  isLoading: boolean;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  goToRegistrationForm(): void {
    this.router.navigateByUrl('/create-new-user');
  }

  onSubmit(): void {
    this.submitted = true;
  }

  login(): void {
    this.isLoading = true;
    if (this.loginForm.status !== 'INVALID') {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe( () => {
        this.isLoading = false;
        this.router.navigate(['/user-panel']);
      }, error => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
}
