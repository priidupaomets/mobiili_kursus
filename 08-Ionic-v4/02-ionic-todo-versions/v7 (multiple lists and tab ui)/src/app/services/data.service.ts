import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TodoList } from '../models/todo-list';
import { Todo } from '../models/todo';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public lists: Array<TodoList> = [];
    public currentList: TodoList = null;

    // public todos: Array<Todo> = [];

    constructor(private storage: Storage) { }

    /*async*/ loadData() {
        console.log('Loading all lists');
        this.storage.get('todolists').then((data) => {
            if (data != null) {
              this.lists = data;
            } else {
              this.lists = [];
            }
        });
        // this.storage.get('todos').then((data) => {
        //   if (data != null) {
        //     this.todos = data;
        //   } else {
        //     this.todos = [];
        //   }
        // });
    }

    saveData() {
        console.log('Saving all lists');
        this.storage.set('todolists', this.lists);
        // this.storage.set('todos', this.todos);
    }

    addList(list: TodoList) {
        if (this.lists != null) {
            console.log('Add todo: ' + list.id);
            const index = this.getListIndex(list.id);

            if (index !== -1) {
                this.lists.splice(index, 1);
                this.saveList(list);
            }
        }
    }

    deleteList(list: TodoList) {
        if (this.lists != null) {
            console.log('Delete list: ' + list.id);
            const index = this.getListIndex(list.id);

            if (index !== -1) {
                this.lists.splice(index, 1);
                this.saveList(list);
            }
        }
    }

    updateList(list: TodoList) {
        if (list != null) {
            // If ID has not yet been generated, assign it now
            if (list.id === 0) {
                const newId = this.getListMaxId() + 1;
                list.id = newId;
                console.log('Assigning new List ID ' + newId);
            }

            // Otsime oma nimekirjast sama ID-ga
            const index = this.getListIndex(list.id);

            if (index === -1) {
                console.log('Adding List');
                this.lists.push(list);
            } else {
                console.log('Updating List at index ' + index);
                this.lists[index] = list;
            }

            this.saveList(list);
        }
    }

    saveList(list: TodoList) {
        console.log('Saving list ' + list.id);
        this.saveData();
    }

    getListById(id: number): TodoList {
        return this.lists.filter(x => x.id === id)[0];
    }

    getListIndex(id: number): number {
        if (this.lists != null) {
            return this.lists.findIndex(x => x.id === id);
        }

        return -1; // Not found
    }

    getListMaxId(): number {
        if (this.lists != null && this.lists.length > 0) {
            return Math.max(0, Math.max.apply(Math, this.lists.map(function(o) { return o.id; })));
        }

        return 0;
    }

    reorderLists(from: number, to: number) {
        const listToMove = this.lists.splice(from, 1)[0];
        this.lists.splice(to, 0, listToMove);

        this.saveData();
    }

    deleteItem(todo: Todo) {
        if (this.currentList != null && this.currentList.items != null) {
            console.log('Delete todo: ' + todo.id);
            const index = this.getItemIndex(todo.id);

            if (index !== -1) {
                this.currentList.items.splice(index, 1);
                this.saveList(this.currentList);
            }
        }
    }

    updateItem(todo: Todo) {
        console.log('Saving data');

        if (todo != null && this.currentList != null && this.currentList.items != null) {
            // If ID has not yet been generated, assign it now
            if (todo.id === 0) {
                const newId = this.getMaxItemId() + 1;
                todo.id = newId;
                console.log('Assigning new ID ' + newId);
            }

            // Otsime oma nimekirjast sama ID-ga
            const index = this.getItemIndex(todo.id);

            if (index === -1) {
                console.log('Adding');
                this.currentList.items.push(todo);
            } else {
                console.log('Updating at index ' + index);
                this.currentList.items[index] = todo;
            }

            this.saveList(this.currentList);
        }
    }

    getItemIndex(id: number): number {
        if (this.currentList != null && this.currentList.items != null) {
            return this.currentList.items.findIndex(x => x.id === id);
        }

        return -1; // Not found
    }

    getItem(id: number): Todo {
        if (this.currentList != null && this.currentList.items != null) {
            return this.currentList.items.filter(x => x.id === id)[0];
        }

        return null;
    }

    getMaxItemId(): number {
        if (this.lists != null) {
            let curMaxId = 0;
            this.lists.forEach(element => {
                if (element.items.length > 0) {
                    curMaxId = Math.max(curMaxId, Math.max.apply(Math, element.items.map(function(o) { return o.id; })));
                }
            });

            return curMaxId;
        }

        return 0;
    }

    reorderItems(from: number, to: number) {
        if (this.currentList != null && this.currentList.items != null) {
          const todoToMove = this.currentList.items.splice(from, 1)[0];
          this.currentList.items.splice(to, 0, todoToMove);

          this.saveList(this.currentList);
        }
    }
}
