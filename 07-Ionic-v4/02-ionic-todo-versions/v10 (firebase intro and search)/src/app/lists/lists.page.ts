import { Component, OnInit, ViewChild } from '@angular/core'; // Added ViewChild
import { NavController, AlertController, IonList } from '@ionic/angular'; // Added IonList
import { DataService } from '../services/data.service';
import { TodoList } from '../models/todo-list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

    @ViewChild(IonList) slidingList: IonList; // Added IonList
    editButton: String = 'Edit';
    editing: Boolean = false;

    constructor(private navCtrl: NavController, public dataService: DataService,
                private alertController: AlertController) {
    }

    ngOnInit() {
      // this.dataService.loadData();
    }

    async addList() {
      // this.navCtrl.navigateForward('tabs/lists/add-list');
      // this.navCtrl.navigateForward('tabs/lists/edit-list');

      const alert = await this.alertController.create({
        header: 'Add List',
        // subHeader: '',
        message: 'Enter the name of the new list',
        inputs: [{
          type: 'text',
          name: 'title',
          placeholder: 'Title'
        // }, {
        //   type: 'text',
        //   name: 'category',
        //   placeholder: 'Category'
        }
        ],
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          cssClass: 'primary',
          handler: (data) => {
            console.log('Confirm Add');
            if (data.title !== '') {
              const list = new TodoList();
              list.title = data.title;
              // list.category = data.category;

              this.dataService.updateList(list);
            } else {
              // Error - data is empty
            }
          }
        }]
      });

      await alert.present();
    }

    selectList(list: TodoList) {
      if (!this.editing) {
        console.log('Navigating to list with id ' + list.id);
        this.navCtrl.navigateForward(['/tabs/lists/todo-list', {id: list.id}]);
      }
    }

    deleteList(list: TodoList) {
      // Close the sliding list item
      this.slidingList.closeSlidingItems().then(() => {
        this.dataService.deleteList(list);
      });
    }

    async confirmDeleteList(list: TodoList) {
      const alert = await this.alertController.create({
        header: 'Remove this List?',
        subHeader: '',
        message: 'You are about to remove current List. Proceed?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteList(list);
          }
        }]
      });

      await alert.present();
    }

    reorderLists(ev) {
      console.log(ev);
      this.dataService.reorderLists(ev.detail.from, ev.detail.to);
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
