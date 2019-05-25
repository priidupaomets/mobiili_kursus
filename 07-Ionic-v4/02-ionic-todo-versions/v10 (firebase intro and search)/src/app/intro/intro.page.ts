import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { IonSlides } from '@ionic/angular';
import { trigger, transition, style, state, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  animations: [
    trigger('bounce', [
          state('*', style({
              transform: 'translateX(0)'
          })),
          transition('* => rightSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(-65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ]))),
          transition('* => leftSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ])))
      ])
    ]
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  skipMessage: string;
  state: string = 'x';

  constructor(private dataService: DataService, private router: Router) {
    this.skipMessage = 'Skip';
  }

  ngOnInit() {
  }

  finish() {
    this.dataService.isIntroWatched = true;
    this.router.navigateByUrl('/');
  }

  lastSlideReached() {
    this.skipMessage = 'Alright, lets go for it!';
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex()) {
      this.state = 'rightSwipe';
    } else {
      this.state = 'leftSwipe';
    }
  }

  animationDone() {
    this.state = 'x';
  }
}
