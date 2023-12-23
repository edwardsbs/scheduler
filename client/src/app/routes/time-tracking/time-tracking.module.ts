import { TabViewModule } from 'primeng/tabview';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrackingComponent } from './time-tracking.component';
import { TimeTrackingRoutingModule } from './time-tracking-routing.module';

@NgModule({
  declarations: [TimeTrackingComponent],
  imports: [
    CommonModule,
    TimeTrackingRoutingModule,
    TabViewModule
  ],
  exports: [TimeTrackingComponent]
})
export class TimeTrackingModule { }
