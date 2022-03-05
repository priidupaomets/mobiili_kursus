import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit, AfterViewInit {

  @ViewChild('finishBtn', { read: ElementRef }) finishBtn: ElementRef;

  private skipMessage: string;
  private buttonAnimation: Animation;

  constructor(private dataService: DataService, private router: Router,
              private animationCtrl: AnimationController) {
    this.skipMessage = 'Skip';
  }

  async ngOnInit() {
  }

  async ngAfterViewInit() {
    this.buttonAnimation = this.animationCtrl.create()
      .addElement(this.finishBtn.nativeElement)
      .duration(250)
      .easing('ease-out')
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(0.6)' },
        { offset: 1, transform: 'scale(1)' }
      ]);
  }

  async finish() {
    this.dataService.isIntroWatched = true;

    await this.buttonAnimation.play(); // Play the animation and wait it to end

    this.router.navigateByUrl('/');
  }

  lastSlideReached() {
    this.skipMessage = 'Alright, lets go for it!';
  }
}
