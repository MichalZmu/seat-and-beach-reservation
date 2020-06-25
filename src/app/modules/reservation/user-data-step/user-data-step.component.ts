import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ReservationService} from '../../../services/reservation.service';

@Component({
  selector: 'app-user-data-step',
  templateUrl: './user-data-step.component.html',
  styleUrls: ['./user-data-step.component.scss']
})
export class UserDataStepComponent implements OnInit {
  user: User = {email: '', firstName: '', _id: '', lastName: '', password: '', phoneNumber: ''};
  submitted = false;
  @Output() currentStepChange = new EventEmitter();

  constructor(private router: Router,
              private reservationService: ReservationService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
  }

  goBack(): void {
    this.currentStepChange.emit(1);
  }

  nextStep(userForm) {
    if (userForm.form.status !== 'INVALID') {
      this.reservationService.firstName = this.user.firstName;
      this.reservationService.lastName = this.user.lastName;
      this.reservationService.email = this.user.email;
      this.user.phoneNumber ? this.reservationService.phoneNumber = this.user.phoneNumber : this.reservationService.phoneNumber = '';
      this.reservationService.addReservation().subscribe(data => {
        this.reservationService.id = data.reservationId;
      });

      this.currentStepChange.emit(3);
    }
  }
}
