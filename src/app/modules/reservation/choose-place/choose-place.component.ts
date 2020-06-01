import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

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

  user: {
    id: string,
    reservation: [
      {
        date: string,
        hourFrom: string,
        hourTo: string
        placeId: number;
      }
    ]
  };


  places: { id: number, reservation: [{date: string, userId: string}]}[] = [
    {
      id: 1, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 2, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 3, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 4, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 5, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 6, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 7, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 8, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 9, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 10, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 11, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 12, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 13, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 14, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 15, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 16, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 17, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 18, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 19, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 21, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 22, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 23, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 24, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 25, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 26, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 27, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    },
    {
      id: 28, reservation: [
        {
          date: '',
          userId: ''
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  isDataChoosed(): void {
   if (this.hourTo && this.hourFrom && this.reservationDate) {
     this.dataChoosed = true;
   }
   console.log(this.places);
  }

  choosePlace(placeId): void {

    const place = this.places.find(x => x.id === placeId);
    place.reservation.push({
      date: this.reservationDate,
      userId: '1'
    });
    console.log(this.places);
    console.log(this.reservationDate, this.hourFrom, this.hourTo);
    this.places.push(this.reservationDate, this.hourFrom, this.hourTo, placeId);
    console.log(this.places);
  }

  isPlaceAvaiable(id): boolean {
    const place = this.places.find(el => el.id === id);
    place.reservation.forEach(date => {
      if (this.reservationDate === date.date) {
        return false;
      }
    });
    return true;
  }
}
