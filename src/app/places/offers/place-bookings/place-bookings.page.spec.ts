import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaceBookingsPage } from './place-bookings.page';

describe('PlaceBookingsPage', () => {
  let component: PlaceBookingsPage;
  let fixture: ComponentFixture<PlaceBookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceBookingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
