import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private navCtrl: NavController, private dataService: DataService) {
    }

    ngOnInit() {
      this.dataService.load();
    }

    addTodo() {
      this.navCtrl.navigateForward('/edit-todo');
    }

    editTodo(todo) {
      this.navCtrl.navigateForward(['/edit-todo', {id: todo.title}]);
    }

}
