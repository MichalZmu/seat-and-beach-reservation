import {Directive, Input} from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appMustMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true}]
})
export class MustMatchDirective {
  @Input('appMustMatch') mustMatchValues: string[] = [];

  constructor() { }

  validate(formGroup: FormGroup): ValidationErrors {
    return this.mustMatch(this.mustMatchValues[0], this.mustMatchValues[1])(formGroup);
  }

  mustMatch(controlName: string, matchingControlName: string) {
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

}
