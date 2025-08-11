import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'day-header',
  templateUrl: './day-header.component.html',
  styleUrls: ['./day-header.component.scss']
})
export class DayHeaderComponent implements OnInit {

  @Input() date: Date | null = new Date();
  @Input() startTime: Date | null = new Date();
  @Input() endTime: Date | null = this.addHours(new Date(), 2.5);
  @Input() elapsedTime: Time | null = {hours: 2, minutes: 30};
  @Input() elapsedHours: number | null = 2.5;
  
  constructor() { }

  ngOnInit() {
  }

  addHours(date: Date, hours: number) {
    const hoursToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
    return date;
  }

}
