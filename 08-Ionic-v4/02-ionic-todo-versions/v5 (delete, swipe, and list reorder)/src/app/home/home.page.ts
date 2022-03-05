import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    editButton: String = 'Edit';
    editing: Boolean = false;

    constructor(private navCtrl: NavController, private dataService: DataService, 
                private alertController: AlertController) {
    }

    ngOnInit() {
      this.dataService.load();
      // this.dataService.todos = [];
      // this.dataService.saveTodos();
    }

    addTodo() {
      this.navCtrl.navigateForward('/edit-todo');
    }

    editTodo(todo: Todo) {
      this.navCtrl.navigateForward(['/edit-todo', {id: todo.id}]);
    }

    toggleDone(todo: Todo) {
      todo.isDone = !todo.isDone;
      this.dataService.saveTodos();
    }

    deleteTodo(todo: Todo) {
      this.dataService.delete(todo);
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
      this.dataService.reorderTodos(ev.detail.from, ev.detail.to);
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
