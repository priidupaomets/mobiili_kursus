import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TodoList } from '../models/todo-list';
import { Todo } from '../models/todo';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public lists: Array<TodoList> = [];
    public currentList: TodoList = null;

    // public todos: Array<Todo> = [];

    constructor(private storage: Storage, private firestore: AngularFirestore) { }

    /*async*/ loadData() {
        // console.log('Initializing data in loadData');
        // this.firestore.collection('lists').snapshotChanges().subscribe(data => {
        //     console.log('Received data: ' + data);

        //     //data.
        //     this.lists = data.map(e => {
        //         const todoList = e.payload.doc.data() as TodoList;
        //         const id = e.payload.doc.id;
        //         todoList.id = id;

        //         // const todoList = new TodoList();

        //         // if (e.type === firebase.firestore.DocumentChangeType.Add)
        //         // todoList.id = e.payload.doc.id;
        //         // todoList.title = e.payload.doc.data()['title'];
        //         // todoList.category = e.payload.doc.data()['category'];

        //         return todoList;
        //     });
        //     console.log(this.lists);
        // });

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

    createId(): string {
        return this.firestore.createId();
    }

    addList(list: TodoList) {
        if (this.lists != null) {
            console.log('Add todo: ' + list.id);

            const index = this.getListIndex(list.id);

            if (index !== -1) {
                this.lists.splice(index, 1);

                // let doc = JSON.stringify(list);
                // this.firestore.collection('lists').add(doc);
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

            // this.firestore.collection('lists').doc(list.id).delete();
        }
    }

    updateList(list: TodoList) {
        if (list != null) {
            // If ID has not yet been generated, assign it now
            if (list.id === '') {
                const newId = this.createId(); // this.getListMaxId() + 1;
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

            // let doc = JSON.stringify(list);
            // this.firestore.doc('lists/' + list.id).update(doc);
            // //this.firestore.collection('lists').doc(list.id).update(doc);
        }
    }

    saveList(list: TodoList) {
        console.log('Saving list ' + list.id);
        this.saveData();
    }

    getListById(id: string): TodoList {
        return this.lists.filter(x => x.id === id)[0];
    }

    getListIndex(id: string): number {
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
            if (todo.id === '') {
                const newId = this.createId(); //this.getMaxItemId() + 1;
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

    getItemIndex(id: string): number {
        if (this.currentList != null && this.currentList.items != null) {
            return this.currentList.items.findIndex(x => x.id === id);
        }

        return -1; // Not found
    }

    getItem(id: string): Todo {
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

    // get isIntroWatched(): boolean {
    //     return (async() => await this.getIsIntroWatched());
    // }

    set isIntroWatched(isWatched: boolean) {
        this.storage.set('IsIntroWatched', isWatched);
    }

    async getIsIntroWatched(): Promise<boolean> {
        const isWatched = await this.storage.get('IsIntroWatched');
        if (isWatched != null) {
            return isWatched;
        } else {
            return false;
        }
    }
}
