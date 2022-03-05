import { Todo } from './todo';

export class TodoList {
    id: string;
    title: string;
    color: string;
    category: string;
    // backgroundImage: string;
    items: Array<Todo>;

    constructor() {
        this.id = '';
        this.title = '';
        this.color = '';
        this.category = '';
        // this.backgroundImage = '';
        this.items = [];
    }

    // deleteItem(todo: Todo) {
    //     if (this.items != null) {
    //         console.log('Delete todo: ' + todo.id);
    //         const index = this.getItemIndex(todo.id);

    //         if (index !== -1) {
    //             this.items.splice(index, 1);
    //         }
    //     }
    // }

    // updateItem(todo: Todo) {
    //     if (todo != null && this.items != null) {
    //         // Otsime oma nimekirjast sama ID-ga
    //         const index = this.getItemIndex(todo.id);

    //         if (index === -1) {
    //             console.log('Adding');
    //             this.items.push(todo);
    //         } else {
    //             console.log('Updating at index ' + index);
    //             this.items[index] = todo;
    //         }
    //     }
    // }

    // getItemIndex(id: number): number {
    //     if (this.items != null) {
    //         return this.items.findIndex(x => x.id === id);
    //     }

    //     return -1; // Not found
    // }

    // getItem(id: number): Todo {
    //     if (this.items != null) {
    //         return this.items.filter(x => x.id === id)[0];
    //     }

    //     return null;
    // }

    // reorderItems(from: number, to: number) {
    //     if (this.items != null) {
    //         const todoToMove = this.items.splice(from, 1)[0];
    //         this.items.splice(to, 0, todoToMove);
    //     }
    // }
}
