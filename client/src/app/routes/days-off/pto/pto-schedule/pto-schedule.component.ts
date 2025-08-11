import { Component, OnInit } from '@angular/core';
import { PtoStore } from '../pto.store';

@Component({
  selector: 'app-pto-schedule',
  templateUrl: './pto-schedule.component.html',
  styleUrls: ['./pto-schedule.component.scss']
})
export class PtoScheduleComponent implements OnInit {

  ptoAnnual$ = this.ptoStore.ptoAnnual$;
  ptoRemainingHours$ = this.ptoStore.ptoRemainingHours$;
  ptoRemainingDays$ = this.ptoStore.ptoRemainingDays$;
  ptoPlanned$ = this.ptoStore.ptoPlanned$;
  ptoPlannedRemaining$ = this.ptoStore.ptoPlannedRemaining$;
  ptoOnHrCalendar$ = this.ptoStore.ptoOnHrCalendar$;
  ptoIsTaken$ = this.ptoStore.ptoIsTaken$;
  ptoActualRemaining$ = this.ptoStore.ptoActualRemaining$;
  compTimeTaken$ = this.ptoStore.compTimeTaken$;
  compTimeRemaining$ = this.ptoStore.compTimeRemaining$;

  doesPtoAnnualNeedToBeCreated$ = this.ptoStore.doesPtoAnnualNeedToBeCreated$;

  constructor(
    private readonly ptoStore: PtoStore,
  ) { }

  ngOnInit() {
  }

  addPtoAnnual() {
    this.ptoStore.addPtoAnnual();
  }

}
