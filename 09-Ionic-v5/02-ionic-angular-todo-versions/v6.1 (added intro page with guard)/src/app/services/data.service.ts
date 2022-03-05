import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public todos: Array<Todo> = [];

  constructor(private storage: Storage) {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    this.storage.create();
  }

  load() {

    // this.todos.push(
    //   { id: 1, title: 'Ärka üles', description : 'Enne kõike tee silmad lahti'},
    //   { id: 2, title: 'Pese silmad', description : 'Siis taastame nägemise'},
    //   { id: 3, title: 'Pane riidesse', description : 'Seejärel paneme end heasse vormi'},
    //   { id: 4, title: 'Söö kõht täis', description : 'Ja valmistame end pikaks päevaks ette'},
    //   { id: 5, title: 'Mine kooli', description : 'Edasi matkame pisut'}
    // );

    this.storage.get('todos').then((data) => {
      if (data != null) {
        this.todos = data;
      } else {
        this.todos = [];
      }
    });
  }

  async loadAsync() {

    // this.load();
    const data = await this.storage.get('todos');

    if (data != null) {
      this.todos = data;
    } else {
      this.todos = [];
    }
  }

  getIndex(id: number): number {
    if (this.todos != null) {
      return this.todos.findIndex(x => x.id === id);
    }

    return -1;
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

  async delete(todo: Todo) {
    if (this.todos != null) {
      const index = this.getIndex(todo.id);

      if (index >= 0) {
        this.todos.splice(index, 1);
        await this.saveTodos();
      }
    }
  }

  async save(todo: Todo) {
    if (this.todos != null) {
      if (todo.id === 0 || todo.id == null) {
        let newId = this.getMaxId();

        // Kui getMaxId()annab tagasi -1, siis uus ID tuleb 1, muidu max + 1
        newId = newId <= 0 ? 1 : newId + 1;
        // if (newId <= 0) {
        //   newId = 1;
        // } else {
        //   newId++;
        // }

        todo.id = newId;
        console.log('Assign new ID ' + newId);
      }

      const index = this.getIndex(todo.id);

      if (index === -1) {
        console.log('Adding todo');
        this.todos.push(todo);
      } else {
        console.log('Updating todo at index ' + index);
        this.todos[index] = todo;
      }

      await this.saveTodos();
    }
  }

  async saveTodos() {
    await this.storage.set('todos', this.todos);
  }

  reorderTodos(from: number, to: number) {
    const todoToMove = this.todos.splice(from, 1)[0];
    this.todos.splice(to, 0, todoToMove);
    this.saveTodos();
  }

  // get isIntroWatched(): boolean {
  //     return (async() => await this.getIsIntroWatched());
  // }

  set isIntroWatched(isWatched: boolean) {
    this.storage.set('IsIntroWatched', isWatched);
  }

  async getIsIntroWatchedAsync(): Promise<boolean> {
      const isWatched = await this.storage.get('IsIntroWatched');

      if (isWatched != null) {
          return isWatched;
      } else {
          return false;
      }
  }

}
