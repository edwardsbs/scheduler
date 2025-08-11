import { Holiday } from './../holidays/data-access/models/index';
import { FormBuilder } from '@angular/forms';
import { HolidayDate } from '../holidays/data-access/models';
import { HolidayScheduleStore } from './holiday-schedule.store';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-holiday-schedule',
  templateUrl: './holiday-schedule.component.html',
  styleUrls: ['./holiday-schedule.component.scss']
})
export class HolidayScheduleComponent {

  dateDialog = false;
  holiday!: HolidayDate;
  holidayDates$ = this.compStore.holidayDates$;
  selectedYear$ = this.compStore.selectedYear$;
  fgHolidaySchedule = this.compStore.fgHolidaySchedule;

  // holidayForm = this.fb.group({
  //   holidays: this.fb.array([])
  // });

  constructor(
    private readonly compStore: HolidayScheduleStore,
    private fb: FormBuilder,
  ) { }

  getDayOfWeek(val: Date) : string {
    return formatDate(val, 'EEEE', 'en-US').toString();
  }

  editDate(holiday: HolidayDate) {
    this.holiday = { ...holiday };
    this.dateDialog = true;
}

  editHoliday(holiday: HolidayDate) {
    console.log(holiday);
    this.compStore.editOrAddHolidayDate(holiday);
  }

  deleteHoliday(holiday: HolidayDate) {
    console.log(holiday);
  }

  // clickCallBack(holiday: HolidayDate) {
  //   console.log(holiday);
  // }

  saveDate() {
    // this.submitted = true;

    if (this.holiday) {
        // if (this.product.id) {
        //     this.products[this.findIndexById(this.product.id)] = this.product;
        //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        // } else {
        //     this.product.id = this.createId();
        //     this.product.image = 'product-placeholder.svg';
        //     this.products.push(this.product);
        //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        // }

        console.log(this.holiday)
        this.compStore.editOrAddHolidayDate(this.holiday);

        // this.products = [...this.products];
        this.dateDialog = false;
        // this.holiday = {};
    }
}

  hideDialog() {
    this.dateDialog = false;
    // this.submitted = false;
}

}
