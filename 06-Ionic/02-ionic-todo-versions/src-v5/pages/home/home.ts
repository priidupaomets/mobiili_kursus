import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //todos: any = [];

  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {

  }

  ionViewDidLoad() {
    this.dataProvider.load();
  }

  addTodo() {
    //console.log("Lisame uue TODO");
    this.navCtrl.push('EditTodoPage');
  }

  editTodo(todo) {
    //console.log("TODO redigeerimine");
    this.navCtrl.push('EditTodoPage', {
      todo: todo
    });
  }
}
