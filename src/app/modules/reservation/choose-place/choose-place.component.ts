import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-place',
  templateUrl: './choose-place.component.html',
  styleUrls: ['./choose-place.component.scss']
})
export class ChoosePlaceComponent implements OnInit {

  dataChoosed: boolean;
  reservationDate;
  hourFrom;
  hourTo;

  places: { id: number, reservationDates:[]}[] = [
    {
      "id": 1, "reservationDates": []
    },
    {
      "id": 2, "reservationDates": []
    },
    {
      "id": 3, "reservationDates": []
    },
    {
      "id": 4, "reservationDates": []
    },
    {
      "id": 5, "reservationDates": []
    },
    {
      "id": 6, "reservationDates": []
    },  
    {
      "id": 7, "reservationDates": []
    },
    {
      "id": 8, "reservationDates": []
    },
    {
      "id": 9, "reservationDates": []
    },
    {
      "id": 10, "reservationDates": []
    },
    {
      "id": 11, "reservationDates": []
    },
    {
      "id": 12, "reservationDates": []
    },
    {
      "id": 13, "reservationDates": []
    },
    {
      "id": 14, "reservationDates": []
    },
    {
      "id": 15, "reservationDates": []
    },
    {
      "id": 16, "reservationDates": []
    },
    {
      "id": 17, "reservationDates": []
    },
    {
      "id": 18, "reservationDates": []
    },
    {
      "id": 19, "reservationDates": []
    },
    {
      "id": 20, "reservationDates": []
    },
    {
      "id": 21, "reservationDates": []
    },
    {
      "id": 22, "reservationDates": []
    },
    {
      "id": 23, "reservationDates": []
    },
    {
      "id": 24, "reservationDates": []
    },
    {
      "id": 25, "reservationDates": []
    },
    {
      "id": 26, "reservationDates": []
    },
    {
      "id": 27, "reservationDates": []
    },
    {
      "id": 28, "reservationDates": []
    }
                  
]
 
 
  constructor() { }

  ngOnInit(): void {
  }

  isDataChoosed(): void {
   if(this.hourTo && this.hourFrom && this.reservationDate) {
     this.dataChoosed = true;
   }
   console.log(this.places);
  }
}