import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Todo } from '../models/todo';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private dataService: DataService,
              private alertCtrl: AlertController) {
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    await this.dataService.loadAsync();
  }

  addTodo() {
    this.navCtrl.navigateForward('/edit-todo');
  }

  editTodo(todo: Todo) {
    this.navCtrl.navigateForward(['/edit-todo', { id: todo.id }]);
  }

  toggleDone(todo: Todo) {
    todo.isDone = !todo.isDone;
    this.dataService.saveTodos();
  }

  deleteTodo(todo: Todo) {
    this.dataService.delete(todo);
  }

  async confirmDeleteTodo(todo: Todo) {
    const alert = await this.alertCtrl.create({
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
}
