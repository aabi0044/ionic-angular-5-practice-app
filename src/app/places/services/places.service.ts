import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      "Kalam",
      'Beautiful Hill Area in the Heart of Pakistan.',
      'https://i.pinimg.com/originals/27/6f/27/276f272af70e0806f0a00ea73ae572b6.jpg',
      1999.99
    ),
    new Place(
      'p1',
      "Gilgit",
      'Beautiful Hill Area in the Heart of KPK.',
      'https://images.unsplash.com/photo-1438786657495-640937046d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      1499.99
    ),
    new Place(
      'p1',
      "Medicine Lake",
      'Beautiful Hill Area in the Heart of United State.',
      'https://images.unsplash.com/photo-1471978445661-ad6ec1f5ba50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80',
      8999.99
    ),
    new Place(
      'p1',
      "Australia",
      'Kanangra-Boyd National Park, Kanangra, Australia.',
      'https://images.unsplash.com/photo-1522660517748-2931a7a4aaf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
      9999.99
    )
  ];

  get places() {
    return [...this._places]
  }
  constructor() { }

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }
}
