import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-user-data-step',
  templateUrl: './user-data-step.component.html',
  styleUrls: ['./user-data-step.component.scss']
})
export class UserDataStepComponent implements OnInit {
  user = new User();
  submitted = false;
  passwordConfirmation: string;
  passwordNeeded = false;

  constructor(private router: Router,
              private reservationService: ReservationService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() {
    return JSON.stringify(this.user);
  }

  nextStep(userForm) {
    console.log(userForm);
    if (userForm.form.status !== 'INVALID') {
      this.reservationService.userId = '123123';
      this.reservationService.firstName = this.user.firstName;
      this.reservationService.lastName = this.user.lastName;
      this.reservationService.email = this.user.email;
      this.user.phoneNumber ? this.reservationService.phoneNumber = this.user.phoneNumber : this.reservationService.phoneNumber = '';
      this.reservationService.addReservation();
      this.router.navigate(['/']);
    }
  }
}

export function mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  };


}
