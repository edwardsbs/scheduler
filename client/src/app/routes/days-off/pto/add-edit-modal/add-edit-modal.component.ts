import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PtoSchedule } from '../data-access/models';
import { ptoHoursOptions } from '../../holidays/data-access/models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {

  ptoForm = this.fb.group({
    ptoScheduleId: new FormControl<number | undefined>(undefined),
    ptoDate: [new Date(), Validators.required],
    reason: ['', Validators.minLength(1)],
    hours: [8, Validators.required],
    isScheduled: [false],
    isTaken: [false], 
  })

  hours = ptoHoursOptions;
  selectedDayOfWeek = "";
   
  constructor(
      private fb: FormBuilder,
      private dialogService: DialogService , 
      private dialog: DynamicDialogRef,
      private dialogConfig: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    
    const pto: PtoSchedule = this.dialogConfig.data.pto;

    this.ptoForm.patchValue({
      ptoScheduleId: pto.ptoScheduleId?? undefined,
      ptoDate: new Date(pto.ptoDate),
      reason: pto.reason,
      hours: pto.hours,
      isScheduled: pto.isScheduled,
      isTaken: pto.isTaken,
    })

    this.getDayOfWeek(new Date(pto.ptoDate));

  }

  closeDialog(data: any) {
    this.dialog.close();
  }

  saveChanges(data: any) {
    const pto = this.ptoForm.value;
    // this.pto.reason = 'shut up'
    // console.log(this.dialogConfig.data.pto)
    this.dialog.close(pto);
  }

  getDayOfWeek(val: Date) {
    this.selectedDayOfWeek = formatDate(val, 'EEEE', 'en-US').toString();
  }

}
