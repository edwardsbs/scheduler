import { Component, OnInit } from '@angular/core';
import { HolidayStore } from './holidays.store';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css'],
})
export class HolidaysComponent implements OnInit {

  holidayDates$ = this.store.holidayDates$;
  holidays$ = this.store.holidays$;

  constructor(
    private readonly store: HolidayStore
  ) { }

  ngOnInit() {
  }

}
