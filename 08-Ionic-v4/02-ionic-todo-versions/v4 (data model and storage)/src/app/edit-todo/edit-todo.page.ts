import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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
              private dataService: DataService) {
    this.todo = new Todo();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log('Edit ' + id);

    if (id != null) {
      const item = this.dataService.get(parseInt(id, 10));
      this.todo = JSON.parse(JSON.stringify(item));
    }
  }

  save() {
    this.dataService.save(this.todo);
    this.navCtrl.navigateBack('/home');
  }
}
