import { Component, OnInit } from '@angular/core';
import { TodoSearchItem } from '../models/todoSearchItem';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public isItemAvailable = false; // initialize the items with false
  public items: Array<TodoSearchItem> = [];

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  searchTodos(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;

      // this.items = this.dataService.lists
      //   .filter((list) => list.title.toLowerCase().indexOf(val.toLowerCase()) > -1)
      //   .map(list => new TodoSearchItem(list, null) );

      let matches: Array<TodoSearchItem> = [];

      this.dataService.lists.forEach(function(l) {
          matches = matches.concat(l.items.filter(function(i) {
              return (i.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }).map(item => new TodoSearchItem(l, item)));
      });

      this.items = matches;

    } else {
      this.clearResults();
    }
  }

  clearResults() {
    this.items = [];
    this.isItemAvailable = false;
  }
}
