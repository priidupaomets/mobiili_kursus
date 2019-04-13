import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  public todo: { title: string, description: string };

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private dataService: DataService) {
    this.todo = { title: '', description: '' };
  }

  ngOnInit() {
    let identifier = this.route.snapshot.paramMap.get('id');

    if (identifier != null) {
      this.todo = this.dataService.get(identifier);
      // this.todo = JSON.parse(JSON.stringify(this.dataService.get(identifier)));
    }
  }

  save() {
    this.dataService.save(this.todo);
    this.navCtrl.navigateBack('/home');
  }
}
