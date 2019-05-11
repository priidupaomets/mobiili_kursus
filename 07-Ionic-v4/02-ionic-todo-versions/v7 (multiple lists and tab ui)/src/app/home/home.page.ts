import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private navCtrl: NavController, private dataService: DataService,
                private alertController: AlertController) {
    }

    ngOnInit() {
      this.dataService.loadData();
    }

}
