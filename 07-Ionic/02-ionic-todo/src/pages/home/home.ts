import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  editButton: string = 'Edit';
  editing: boolean = false;

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

  reorderTodos(indexes) {
    this.dataProvider.reorderTodos(indexes);
  }

  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.editButton = 'Done';
    } else {
      this.editButton = 'Edit';
    }
  }
}
