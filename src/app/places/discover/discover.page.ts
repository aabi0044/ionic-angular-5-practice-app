import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Place } from '../models/place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
loadedPlaces:Place[];
listedLoadedPlaces:Place[];
  constructor(private PlacesService: PlacesService) { }

  ngOnInit() {
    this.loadedPlaces = this.PlacesService.places;
    this.listedLoadedPlaces =this.PlacesService.places.slice(1)
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

}
