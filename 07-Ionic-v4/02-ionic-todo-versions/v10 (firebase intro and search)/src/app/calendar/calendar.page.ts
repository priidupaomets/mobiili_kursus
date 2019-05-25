import { Component, OnInit } from '@angular/core';
// import { CalendarComponentOptions } from 'ion4-calendar';
// import { CalendarComponent } from "ionic2-calendar/calendar";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  // // Description: https://www.npmjs.com/package/ion4-calendar
  // public dateMulti: string[];
  // public type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  // public optionsMulti: CalendarComponentOptions = {
  //   pickMode: 'multi'
  // };
  // date: string;

  // // https://github.com/twinssbc/Ionic2-Calendar

  constructor() { }

  ngOnInit() {
  }

  onChange($event) {
    console.log($event);
  }
}
