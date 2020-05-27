import {Component, OnInit} from '@angular/core';
import {HeaderService} from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  selectedStep = 1;

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.getStep().subscribe(data => {
      this.selectedStep = data;
    });

  }

}
