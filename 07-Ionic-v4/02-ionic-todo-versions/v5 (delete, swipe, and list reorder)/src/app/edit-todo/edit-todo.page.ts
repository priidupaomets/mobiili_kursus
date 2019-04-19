import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  public todo: Todo;

  constructor(private route: ActivatedRoute, private navCtrl: NavController,
              private dataService: DataService, private alertController: AlertController) {
    this.todo = new Todo();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log('Edit ' + id);

    if (id != null) {
      const item = this.dataService.get(parseInt(id, 10));

      if (item != null) {
        let str = JSON.stringify(item);
        console.log('editing: ' + str);
        this.todo = JSON.parse(str);
      }
    }
  }

  async confirmDeleteTodo() {
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
          this.deleteTodo();
        }
      }]
    });

    await alert.present();
  }

  deleteTodo() {
    this.dataService.delete(this.todo);
    this.navCtrl.navigateBack('/home');
  }

  save() {
    this.dataService.save(this.todo);
    this.navCtrl.navigateBack('/home');
  }
}
