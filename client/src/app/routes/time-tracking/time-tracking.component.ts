import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimeTrackingComponentStore } from './time-tracking.store';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
// import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DayHeaderComponent } from './day-header/day-header.component';
import { TaskUnitComponent } from './task-unit/task-unit.component';

@Component({
  selector: 'time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    // CalendarModule,
    FormsModule, 
    ReactiveFormsModule,
    CardModule,
    DatePickerModule,
    DayHeaderComponent,
    TaskUnitComponent,
  ],
  providers: [TimeTrackingComponentStore],
})
export class TimeTrackingComponent implements OnInit {

  timeEntryForm = this.fb.group({
    date: [new Date(), Validators.required],
  })

  // currentDateSelection: Date | null = new Date();
  currentDateSelection$ = this.compStore.selectedDate$;
  // datesForSelectedWeek: Date[] | null = [new Date()];
  datesForSelectedWeek$ = this.compStore.datesForSelectedWeek$;

  constructor(
    private readonly fb: FormBuilder,
    private readonly compStore: TimeTrackingComponentStore
  ) { }

  ngOnInit() {
    
  }

  pushSelection(sel: Date) {
    // const dt: Date = new Date(JSON.parse(JSON.stringify(sel)));
    // // this.currentDateSelection = sel;
    // this.timeEntryForm.controls['date'].patchValue(sel);
    // this.store.dispatch(timeTrackingActions.setSelectedDate({ selectedDate: sel }))
    // this.datesForSelectedWeek = this.dates(dt);
    console.log('pushSelection', sel)
    this.compStore.updateSelectedDate(sel);
  }

  dates(selectedDate: Date) {
    var week= new Array(); 
    // Starting Monday not Sunday
    let adjustedDate: Date = selectedDate;
    adjustedDate.setDate((adjustedDate.getDate() - adjustedDate.getDay() +1))

    // console.log('1 - selectedDate', selectedDate, 'adjustedDate', adjustedDate, 'current selected', this.currentDateSelection)

    for (var i = 0; i < 7; i++) {
        week.push(
            new Date(adjustedDate)
        ); 
        adjustedDate.setDate(adjustedDate.getDate() +1);
    }
    // console.log('2 - selectedDate', selectedDate, 'adjustedDate', adjustedDate, 'current selected', this.currentDateSelection)
    return week; 
}

}
