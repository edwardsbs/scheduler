import { HolidayDate } from '../holidays/data-access/models';
import { HolidayScheduleStore } from './holiday-schedule.store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holiday-schedule',
  templateUrl: './holiday-schedule.component.html',
  styleUrls: ['./holiday-schedule.component.scss']
})
export class HolidayScheduleComponent {

  holidayDates$ = this.compStore.holidayDates$;
  selectedYear$ = this.compStore.selectedYear$;

  constructor(
    private readonly compStore: HolidayScheduleStore
  ) { }


  editHoliday(holiday: HolidayDate) {
    console.log(holiday);
  }
  deleteHoliday(holiday: HolidayDate) {
    console.log(holiday);
  }

}
