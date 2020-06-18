import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { AuthService } from 'src/app/auth/service/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      "Kalam",
      'Beautiful Hill Area in the Heart of Pakistan.',
      'https://i.pinimg.com/originals/27/6f/27/276f272af70e0806f0a00ea73ae572b6.jpg',
      1999.99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'abcs'
    ),
    new Place(
      'p2',
      "Gilgit",
      'Beautiful Hill Area in the Heart of KPK.',
      'https://images.unsplash.com/photo-1438786657495-640937046d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      1499.99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      "Medicine Lake",
      'Beautiful Hill Area in the Heart of United State.',
      'https://images.unsplash.com/photo-1471978445661-ad6ec1f5ba50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80',
      8999.99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'abc'
    )
  ]
  )
  get places() {
    return this._places.asObservable();
  }
  constructor(private authService: AuthService,
    private http: HttpClient
  ) { }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      }))

  }
  addPlace(title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://images.unsplash.com/photo-1522660517748-2931a7a4aaf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    )
   return  this.http.post('https://ionic-5-angular.firebaseio.com/offered-places.json', { ...newPlace, id: null })
    return this.places.pipe(take(1), delay(1000), tap(places => {
      this._places.next(places.concat(newPlace));
    }));


  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
