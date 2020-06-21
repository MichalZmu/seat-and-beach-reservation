import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent implements OnInit {

  user: User = {email: '', firstName: '', _id: null, lastName: '', password: '', phoneNumber: ''};
  submitted = false;
  passwordConfirmation: string;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
  }

  createUser(userForm) {
    if (userForm.form.status !== 'INVALID') {
      this.authService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        userForm.reset();
      });
    }
  }
}
