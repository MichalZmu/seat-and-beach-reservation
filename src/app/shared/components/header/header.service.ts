import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private dataObs = new Subject();

  constructor() { }

  getStep(): any {
    return this.dataObs;
  }

  updateStep(data: number) {
    this.dataObs.next(data);
  }
}
