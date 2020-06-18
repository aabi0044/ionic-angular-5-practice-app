import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../models/place.model';
import { PlacesService } from '../services/places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  isLoading = false;
  private placesSub: Subscription;

  constructor(private placesService: PlacesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let user = this.authService.userId;
    this.placesSub = this.placesService.places.subscribe(places => {

      this.offers = places.filter(offer => offer.userId == user);
    })
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }
  onEdit(id: string, slidingItem: IonItemSliding) {
    console.log(id)
    slidingItem.close();
    this.router.navigate(['places/tabs/offers/edit/' + id]);



  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
