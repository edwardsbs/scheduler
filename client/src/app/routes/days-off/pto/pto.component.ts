import { Component, OnInit, Input } from '@angular/core';
import { PtoStore } from './pto.store';
import { PtoSchedule } from './data-access/models';
import { DaysOffStore } from '../days-off.store';

@Component({
  selector: 'app-pto',
  templateUrl: './pto.component.html',
  styleUrls: ['./pto.component.scss'],
})
export class PtoComponent implements OnInit {

  @Input() year: number = 2022

  selectedYear$ = this.ptoStore.selectedYear$;
  ptoSchedule$ = this.ptoStore.ptoSchedule$;  
  years$ = this.store.years$;

  constructor(
    private readonly ptoStore: PtoStore,
    private readonly store: DaysOffStore
  ) { }

  ngOnInit() {
  }

  deletePto(pto: PtoSchedule) {
    console.log(pto)
  }

  editPto(pto: PtoSchedule) {
    this.ptoStore.editPto(pto);
  }

  addPto() {
    this.ptoStore.addPto();
  }

  yearSelectionChange(event: any) {
    console.log('year', new Date(event).getFullYear())
    this.store.setSelectedYear(new Date(event).getFullYear());
  }

  toggleIsScheduled(schedule: PtoSchedule) {
    const sched = {
      ...schedule,
      isScheduled: !schedule.isScheduled
    }
    this.ptoStore.editPtoSchedule(sched)
  }

  toggleIsTaken(schedule: PtoSchedule) {
    const sched = {
      ...schedule,
      isTaken: !schedule.isTaken
    }
    this.ptoStore.editPtoSchedule(sched)
  }

}
