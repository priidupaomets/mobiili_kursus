import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  public todo: { title: string, description: string };

  constructor() {
    this.todo = { title: '', description: '' };
  }

  ngOnInit() {
  }

  save() {
    console.log('Saving todo');
  }
}
