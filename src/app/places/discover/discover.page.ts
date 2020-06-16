import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Place } from '../models/place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
loadedPlaces:Place[];
  constructor(private PlacesService: PlacesService) { }

  ngOnInit() {
    this.loadedPlaces = this.PlacesService.places;
  }


}
