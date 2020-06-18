import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { BookingService } from 'src/app/bookings/services/booking.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit , OnDestroy{
  place: Place;
  isBookable = false;
  private placeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private authService:AuthService,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placeSub = this.placesService
      .getPlace(paramMap.get('placeId'))
      .subscribe(place => {
        console.log("place ",place)
        this.place = place;
        this.isBookable = place.userId !== this.authService.userId;
      });
  });
  }
  onBookPlace() {

    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });


  }
  openBookingModal(mode: 'select' | 'random') {

    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place }
    }).then(model => {
      model.present();
      return model.onDidDismiss();
    })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          this.loadingCtrl
          .create({ message: 'Booking place...' })
          .then(loadingEl => {
            loadingEl.present();
            const data = resultData.data.bookingData;
            this.bookingService
              .addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate
              )
              .subscribe(() => {
                loadingEl.dismiss();
              });
          });
        }
      });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
