import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Time } from 'src/app/shared/models/time';

@Component({
  selector: 'task-unit',
  templateUrl: './task-unit.component.html',
  styleUrls: ['./task-unit.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    CardModule,
  ]
})
export class TaskUnitComponent implements OnInit {

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
