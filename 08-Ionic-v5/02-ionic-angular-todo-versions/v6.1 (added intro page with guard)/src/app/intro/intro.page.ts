import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  skipMessage: string;

  constructor(private dataService: DataService, private router: Router) {
    this.skipMessage = 'Skip';
  }

  async ngOnInit() {
  }

  finish() {
    this.dataService.isIntroWatched = true;
    this.router.navigateByUrl('/');
  }

  lastSlideReached() {
    this.skipMessage = 'Alright, lets go for it!';
  }

}
