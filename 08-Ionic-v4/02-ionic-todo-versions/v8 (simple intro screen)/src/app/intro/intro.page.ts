import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  skipMessage: string;

  constructor(private dataService: DataService, private router: Router) 
  {
    this.skipMessage = 'Skip';
  }

  ngOnInit() {
  }

  finish() {
    this.dataService.isIntroWatched = true;
    this.router.navigateByUrl('/');
  }
}
