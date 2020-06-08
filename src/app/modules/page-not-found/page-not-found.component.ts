import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.updateStep(-1);
  }

}
