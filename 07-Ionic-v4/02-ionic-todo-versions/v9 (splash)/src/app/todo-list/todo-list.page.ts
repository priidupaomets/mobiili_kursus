import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Todo } from '../models/todo';
import { TodoList } from '../models/todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

    editButton: String = 'Edit';
    editing: Boolean = false;
    public list: TodoList;

    constructor(private route: ActivatedRoute, private navCtrl: NavController,
                private dataService: DataService,
                private alertController: AlertController) {
        this.list = new TodoList();
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');

        if (id != null) {
            const data = this.dataService.getListById(parseInt(id, 10));

            if (data != null) {
                this.list = data;

                // Save the list also on global dataSerive as currently selected one
                this.dataService.currentList = this.list;
            }
        }
    }

    addTodo() {
        this.navCtrl.navigateForward('/tabs/lists/edit-todo');
    }

    editTodo(todo: Todo) {
        if (!this.editing) {
            this.navCtrl.navigateForward(['/tabs/lists/edit-todo', {id: todo.id}]);
        }
    }

    toggleDone(todo: Todo) {
        todo.isDone = !todo.isDone;
        this.dataService.saveList(this.list);
    }

    deleteTodo(todo: Todo) {
        this.dataService.deleteItem(todo);
        // this.dataService.currentList.deleteItem(todo);
        // this.dataService.saveList(this.list);
    }

    async confirmDeleteTodo(todo: Todo) {
        const alert = await this.alertController.create({
            header: 'Remove this Todo?',
            subHeader: '',
            message: 'You are about to remove current Todo. Proceed?',
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'Delete',
                cssClass: 'danger',
                handler: () => {
                    console.log('Confirm Delete');
                    this.deleteTodo(todo);
                }
            }]
        });

        await alert.present();
    }

    reorderTodos(ev) {
        console.log(ev);
        this.dataService.reorderItems(ev.detail.from, ev.detail.to);
        // this.list.reorderItems(ev.detail.from, ev.detail.to);
        // this.dataService.saveList(this.list);

        // Finish the reordering operation
        ev.detail.complete();
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
