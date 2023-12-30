import { Component, OnInit, Input } from '@angular/core';
import { PtoStore } from './pto.store';
import { PtoSchedule } from './data-access/models';

@Component({
  selector: 'app-pto',
  templateUrl: './pto.component.html',
  styleUrls: ['./pto.component.scss'],
})
export class PtoComponent implements OnInit {

  @Input() year: number = 2022

  selectedYear$ = this.ptoStore.selectedYear$;
  ptoSchedule$ = this.ptoStore.ptoSchedule$;
  ptoRemainingHours$ = this.ptoStore.ptoRemainingHours$;

  constructor(
    private readonly ptoStore: PtoStore,
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
}
