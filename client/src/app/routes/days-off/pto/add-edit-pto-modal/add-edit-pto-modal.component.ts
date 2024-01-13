import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewPto, PtoSchedule } from '../data-access/models';
import { ptoHoursOptions } from '../../holidays/data-access/models';
import { formatDate } from '@angular/common';
import { AddEditMode } from '../../data-access/models';

export enum selectionMode{
  'single',
  'multiple',
  'range', 
  undefined
} 

@Component({
  selector: 'app-add-edit-pto-modal',
  templateUrl: './add-edit-pto-modal.component.html',
  styleUrls: ['./add-edit-pto-modal.component.scss']
})
export class AddEditPtoModalComponent implements OnInit {

  addOrEditMode = AddEditMode.NotSelected;

  ptoForm = this.fb.group({
    ptoScheduleId: new FormControl<number | undefined>(undefined),
    ptoDate: [new Date(), Validators.required],
    ptoDateRange: [[new Date()]],
    reason: ['', Validators.minLength(1)],
    hours: [8, Validators.required],
    isScheduled: [false],
    isTaken: [false], 
  })

  hours = ptoHoursOptions;
  selectedDayOfWeek = "";
  rangeDates: Date[] | undefined;
  
  // dateSelectionMode = selectionMode.range; //'"single" | "multiple" | "range" | undefined'
  dateSelectionMode = "single";

  constructor(
      private fb: FormBuilder,
      private dialog: DynamicDialogRef,
      private dialogConfig: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    
    this.addOrEditMode = this.dialogConfig.data.addOrEditMode;

    const pto: PtoSchedule = this.dialogConfig.data.pto;

    this.ptoForm.patchValue({
      ptoScheduleId: pto.ptoScheduleId?? undefined,
      ptoDate: new Date(pto.ptoDate),
      // ptoDateRange: [new Date(pto.ptoDate)],
      reason: pto.reason,
      hours: pto.hours,
      isScheduled: pto.isScheduled,
      isTaken: pto.isTaken,
    })

    this.getDayOfWeekSingle(new Date(pto.ptoDate));

  }

  closeDialog(data: any) {
    this.dialog.close();
  }

  saveChanges() {
    if(this.addOrEditMode === AddEditMode.Add) 
    {
      this.saveChangesAdd();
    } else {
      this.saveChangesEdit();
    }  
  }

  saveChangesEdit() {
    const pto = this.ptoForm.value;    
    this.dialog.close(pto);
  }

  saveChangesAdd() {
    const pto = this.ptoForm.value;
    
    let ptoEntries: NewPto[] = [];
    
    if (this.rangeDates) {
      const fullRange = this.rangeDates?.length > 1? this.getDaysArray(this.rangeDates[0], this.rangeDates[1]) : [pto.ptoDate];
      fullRange.forEach(dr => {
        ptoEntries = ptoEntries.concat(
          {
            ptoDate: dr,
            reason: pto.reason,
            hours: pto.hours,
            isScheduled: pto.isScheduled,
            isTaken: pto.isTaken,
        } as NewPto
        )
      })

      this.dialog.close(ptoEntries);
    }
  }

  getDayOfWeekSingle(val: Date) {
    this.rangeDates = [val];
    // this.ptoForm.controls.ptoDateRange.patchValue([val])
    // this.ptoForm.controls.ptoDate.patchValue([val]);
    this.selectedDayOfWeek = formatDate(val, 'EEEE', 'en-US').toString();
  }

  getDayOfWeekRange() {
    if(this.rangeDates) {
      // const d1 = this.rangeDates? this.rangeDates[0] : undefined;
      // if(d1) this.selectedDayOfWeek = formatDate(d1, 'EEEE', 'en-US').toString();

      const fullRange = this.getDaysArray(this.rangeDates[0], this.rangeDates[1]);
      
      if(fullRange.length > 1) {
        let dowString: string[] = [];
        fullRange.forEach(d => {
          if(fullRange.length >= 3) dowString.push(formatDate(d, 'EEE', 'en-US').toString())
          if(fullRange.length < 3) dowString.push(formatDate(d, 'EEEE', 'en-US').toString())
        })
  
        // console.log(dowString)
        this.selectedDayOfWeek = dowString.toString();
      }

    }
  }

  getDaysArray(start: Date, end: Date) {
    for(var arr=[], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }

    return arr;
};

  setSelectionMode(mode: string) {
    this.dateSelectionMode = mode;
    if(mode === 'range'){
      this.selectedDayOfWeek = "";
    } else {
      this.rangeDates = [];
      // this.ptoForm.controls.ptoDateRange.patchValue([]);
    }
  }

}
