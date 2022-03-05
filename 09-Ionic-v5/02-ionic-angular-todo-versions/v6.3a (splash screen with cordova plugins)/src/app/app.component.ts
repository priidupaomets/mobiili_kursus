import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showSplash: Boolean = true; // This controls the visibility of our animation

  constructor(private platform: Platform, private splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Start timer which will execute the code once timer runs out, thus closing the animated splash
      timer(3000).subscribe(() => { this.showSplash = false; });
    });
  }
}
