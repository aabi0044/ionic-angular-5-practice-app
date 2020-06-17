import { Component, OnInit } from '@angular/core';
import { BookingService } from './services/booking.service';
import { Booking } from './models/booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[];
  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
    this.loadedBookings = this.bookingService.bookings;
  }
  onDelete(id: string, slidding: IonItemSliding) {
    slidding.close();

  }

}
