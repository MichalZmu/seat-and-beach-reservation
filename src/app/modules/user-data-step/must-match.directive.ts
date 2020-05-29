import {Directive, Input} from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors} from '@angular/forms';
import {mustMatch} from './user-data-step.component';

@Directive({
  selector: '[appMustMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true}]
})
export class MustMatchDirective {
  @Input('appMustMatch') mustMatchValues: string[] = [];

  constructor() { }

  validate(formGroup: FormGroup): ValidationErrors {
    return mustMatch(this.mustMatchValues[0], this.mustMatchValues[1])(formGroup);
  }

}
