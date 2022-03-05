import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the EditTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-todo',
  templateUrl: 'edit-todo.html',
})
export class EditTodoPage {

  todo: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public dataProvider: DataProvider, public alertCtrl: AlertController) {
    this.todo = { title: '', description: '', isDone: false };
  }

  ionViewDidLoad() {
    let todo = this.navParams.get('todo');

    if (typeof(todo) !== "undefined") {
      this.todo = todo;
    }
  }

  confirmRemove() {
    let confirm = this.alertCtrl.create({
      title: 'Remove Todo?',
      message: 'You are about to remove current Todo. Proceed?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeTodo();
          }
        }
      ]
    });
    confirm.present();
  }

  removeTodo() {
    this.dataProvider.removeTodo(this.todo);
    this.navCtrl.pop();
  }

  save() {
    this.dataProvider.save(this.todo);
    this.navCtrl.pop();
  }

}
