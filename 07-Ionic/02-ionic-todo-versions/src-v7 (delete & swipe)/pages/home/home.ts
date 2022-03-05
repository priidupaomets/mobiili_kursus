import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {

  }

  ionViewDidLoad() {
    this.dataProvider.load();
  }

  addTodo() {
    this.navCtrl.push('EditTodoPage');
  }

  editTodo(todo) {
    this.navCtrl.push('EditTodoPage', {
      todo: todo
    });
  }

  toggleDone(todo) {
    todo.isDone = !todo.isDone;
  }

  removeTodo(todo) {
    this.dataProvider.removeTodo(todo);
  }
}
