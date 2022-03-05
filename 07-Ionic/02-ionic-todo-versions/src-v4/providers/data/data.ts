import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  todos: any = [];

  constructor(public http: HttpClient) {
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
  }

}
