import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { AuthService } from 'src/app/auth/service/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { PlaceLocation } from '../models/location.model';
interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
}
// new Place(
//   'p1',
//   "Kalam",
//   'Beautiful Hill Area in the Heart of Pakistan.',
//   'https://i.pinimg.com/originals/27/6f/27/276f272af70e0806f0a00ea73ae572b6.jpg',
//   1999.99,
//   new Date('2020-01-01'),
//   new Date('2020-12-31'),
//   'abcs'
// ),
// new Place(
//   'p2',
//   "Gilgit",
//   'Beautiful Hill Area in the Heart of KPK.',
//   'https://images.unsplash.com/photo-1438786657495-640937046d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//   1499.99,
//   new Date('2020-01-01'),
//   new Date('2020-12-31'),
//   'abc'
// ),
// new Place(
//   'p3',
//   "Medicine Lake",
//   'Beautiful Hill Area in the Heart of United State.',
//   'https://images.unsplash.com/photo-1471978445661-ad6ec1f5ba50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80',
//   8999.99,
//   new Date('2020-01-01'),
//   new Date('2020-12-31'),
//   'abc'
// )
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([])
  get places() {
    return this._places.asObservable();
  }
  constructor(private authService: AuthService,
    private http: HttpClient
  ) { }

  getPlace(id: string) {
    return this.http
    .get<PlaceData>(
      `https://ionic-5-angular.firebaseio.com/offered-places/${id}.json`
    )
    .pipe(
      map(placeData => {
        return new Place(
          id,
          placeData.title,
          placeData.description,
          placeData.imageUrl,
          placeData.price,
          new Date(placeData.availableFrom),
          new Date(placeData.availableTo),
          placeData.userId,
          placeData.location
        );
      })
    );

  }

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-5-angular.firebaseio.com/offered-places.json'
      )
      .pipe(
        map(resData => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId,
                 resData[key].location
                )
              );
            }
          }
          return places;
          // return [];
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }
  addPlace(title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation,
    imageUrl:string
  ) {
    let generatedId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      imageUrl,
      price,
      dateFrom,
      dateTo,
      this.authService.userId,
      location
    )
    return this.http.post('https://ionic-5-angular.firebaseio.com/offered-places.json', { ...newPlace, id: null })
      .pipe(
        switchMap((resData: any) => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );


  }



  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId,
          oldPlace.location
        );
        return this.http.put(
          `https://ionic-5-angular.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.http.post<{imageUrl: string, imagePath: string}>(
      'https://us-central1-ionic-5-angular.cloudfunctions.net/storeImage',
      uploadData
    );
  }
}
