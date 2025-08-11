import { TabViewModule } from 'primeng/tabview';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrackingComponent } from './time-tracking.component';
import { TimeTrackingRoutingModule } from './time-tracking-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TaskUnitComponent } from './task-unit/task-unit.component';
import { DayHeaderComponent } from './day-header/day-header.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { TimeTrackingComponentStore } from './time-tracking.store';

@NgModule({
  declarations: [TimeTrackingComponent, TaskUnitComponent, DayHeaderComponent, TimeEntryComponent],
  imports: [
    CommonModule,
    TimeTrackingRoutingModule,
    TabViewModule,
    CalendarModule,
    FormsModule, 
    ReactiveFormsModule,
    CardModule,
  ],
  exports: [TimeTrackingComponent, TaskUnitComponent],
  providers: [TimeTrackingComponentStore]
})
export class TimeTrackingModule { }
