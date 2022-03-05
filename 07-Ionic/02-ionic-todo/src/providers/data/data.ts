import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { reorderArray } from 'ionic-angular';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  todos: any = [];

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello DataProvider Provider');
  }

  load() {
    //Loome lubaduse (promise), mis tagastab meile millalgi tulevikus andmeid
    return new Promise(resolve => {
      if (this.todos.length > 0) {
        resolve(this.todos);
      } else {
        // Meil pole veel midagi tagastada, seega ei tee midagi
        //resolve(undefined);

        this.storage.get('todoData').then((todos) => {
          if (todos && typeof(todos) !== "undefined") {
            this.todos = todos;
          }

          resolve(this.todos);
        });

      }
    });
  }

  save(todo) {
    // Kui leiame oma elementide hulgast samasuguse, siis muudame seda, vastasel juhul lisame
    let index = this.todos.indexOf(todo);

    if (index === -1) {
      this.todos.push(todo);
    } else {
      this.todos[index] = todo;
    }

    this.storage.set('todoData', this.todos);

  }

  removeTodo(todo) {
    let index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todos.splice(index, 1);
    }

    this.storage.set('todoData', this.todos);
  }

  reorderTodos(indexes) {
    // let element = this.todos[indexes.from];
    // this.todos.splice(indexes.from, 1);
    // this.todos.splice(indexes.to, 0, element);

    this.todos = reorderArray(this.todos, indexes);

    this.storage.set('todoData', this.todos);
  }

}
