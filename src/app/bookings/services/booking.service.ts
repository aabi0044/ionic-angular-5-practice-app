import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings: Booking[]=[
{
  id:'xyz',
  placeId:'p1',
  placeTitle: 'Rawalpindi',
  guestNumber:3,
  userId:'abc'
},
{
  id:'xyzdsd',
  placeId:'p2',
  placeTitle: 'Islamabad',
  guestNumber:5,
  userId:'abcre'
},
{
  id:'xyzdsd',
  placeId:'p3',
  placeTitle: 'Lahore',
  guestNumber:9,
  userId:'abcre'
}

  ];

  get bookings() {
    return [...this._bookings];
  }
  constructor() { }
}
