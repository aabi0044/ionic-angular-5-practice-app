import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Place;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
     
      if (!paramMap.has('offerId')) {
        this.navCtrl.navigateBack('offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('offerId'));
    
    });
  }
}
