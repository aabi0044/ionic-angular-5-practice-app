import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Place } from '../models/place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private placesSub: Subscription;
  constructor(
    private PlacesService: PlacesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.placesSub = this.PlacesService.places.subscribe(places => {
      console.log("on discove page ", places)
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    });
  }


  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(
        place => place.userId !== this.authService.userId
      );
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
