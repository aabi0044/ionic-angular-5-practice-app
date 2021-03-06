import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import {Plugins,Capacitor} from '@capacitor/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,

    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    if(Capacitor.isPluginAvailable('SplashScreen')){
      Plugins.SplashScreen.hide();
    }
    });
  }
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth')
  }
}
