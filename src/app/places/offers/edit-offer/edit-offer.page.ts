import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Place } from '../../models/place.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  place: Place;
  form: FormGroup;
  placeId: string;
  isLoading = false;
  private placeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
     
      if (!paramMap.has('offerId')) {
        this.navCtrl.navigateBack('offers');
        return;
      }
      this.placeId = paramMap.get('offerId');
      console.log(this.placeId)
      this.isLoading = true;
      this.placeSub = this.placesService
        .getPlace(paramMap.get('offerId'))
        .subscribe(place => {
          
          this.place = place;
          this.form = new FormGroup({
            title: new FormControl(this.place.title, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            description: new FormControl(this.place.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(180)]
            })
          });
          this.isLoading = false;
        },
        error => {
          this.alertCtrl
            .create({
              header: 'An error occurred!',
              message: 'Place could not be fetched. Please try again later.',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigate(['/places/tabs/offers']);
                  }
                }
              ]
            })
            .then(alertEl => {
              alertEl.present();
            });
        });
    });
  }
  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating place...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.placesService
          .updatePlace(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/places/tabs/offers']);
          });
      });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
