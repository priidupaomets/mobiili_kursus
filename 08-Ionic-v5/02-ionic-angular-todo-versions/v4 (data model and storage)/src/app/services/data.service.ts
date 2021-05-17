import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public todos: Array<Todo> = [];

  constructor(private storage: Storage) { }

  load() {
    console.log('Loading data');
    this.storage.get('todos').then((data) => {
      if (data != null) {
        this.todos = data;
      } else {
        this.todos = [];
      }

      console.log(this.todos);
    });

    // this.todos.push(
    //   { id: 1, title: 'Ärka üles', description: 'Enne kõike peame silmad lahti tegema' },
    //   { id: 2, title: 'Pese silmad', description: 'Siis taastame nägemise' },
    //   { id: 3, title: 'Pane riidesse', description: 'Seejärel paneme end mõislikusse vormi' },
    //   { id: 4, title: 'Söö kõht täis', description: 'Ja valmistame end pikaks päevaks ette' },
    //   { id: 5, title: 'Mine kooli', description: 'Edasi matkame pisut' },
    //   { id: 6, title: 'Kuula hoolikalt loenguid', description: 'Ning kogume nii palju tarkusi kui võimalik' });
  }

  getIndex(id: number): number {
    // return this.todos.findIndex(x => x.id === id);
    if (this.todos != null) {
      return this.todos.findIndex(x => x.id === id);
    }

    return -1; // Not found
  }

  get(id: number): Todo {
    return this.todos.filter(x => x.id === id)[0];
  }

  getMaxId(): number {
    if (this.todos != null) {
      return Math.max.apply(Math, this.todos.map(o => o.id));
    }

    return -1;
  }

  save(todo: Todo) {
    console.log('Saving data');
    if (todo !== null) {
      // If ID has not yet been generated, assign it now
      if (todo.id === 0 || todo.id == null) {
        const newId = this.getMaxId() + 1;
        todo.id = newId;
        console.log('Assigning new ID ' + newId);
      }

      const index = this.getIndex(todo.id);

      if (index === -1) {
        console.log('Adding');
        this.todos.push(todo);
      } else {
        console.log('Updating at index ' + index);
        this.todos[index] = todo;
      }

      this.storage.set('todos', this.todos);
  }
  }

}
