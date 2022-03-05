import { Todo } from './todo';
import { TodoList } from './todo-list';

export class TodoSearchItem {
    list: TodoList;
    item: Todo;

    constructor(list: TodoList, item: Todo) {
        this.list = list;
        this.item = item;
    }

    get title(): string {
        return this.item != null ? this.item.title : '';
    }

    get listTitle(): string {
        return this.list != null ? this.list.title : '';
    }
}
