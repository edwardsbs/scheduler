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
  activeYear = 0;
  showAddPTOEntry$ = this.ptoStore.showAddPTOEntry$;

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
    this.ptoStore.editPtoEntry(pto);
  }

  addPto() {
    this.ptoStore.addPtoEntry();
  }

  // yearSelectionChange(event: any) {
  //   // console.log('year', new Date(event).getFullYear())
  //   console.log('year', event);
  //   this.activeYear = event;
  //   // this.store.setSelectedYear(new Date(event).getFullYear());
  //   this.store.setSelectedYear(event);
  // }

  toggleIsScheduled(schedule: PtoSchedule) {
    const sched = {
      ...schedule,
      isScheduled: !schedule.isScheduled
    }
    this.ptoStore.editPto(sched)
  }

  toggleIsTaken(schedule: PtoSchedule) {
    const sched = {
      ...schedule,
      isTaken: !schedule.isTaken
    }
    this.ptoStore.editPto(sched)
  }

  toggleTakenAsCompTime(schedule: PtoSchedule) {
    const sched = {
      ...schedule,
      takenAsCompTime: !schedule.takenAsCompTime
    }
    this.ptoStore.editPto(sched)
  }

}
