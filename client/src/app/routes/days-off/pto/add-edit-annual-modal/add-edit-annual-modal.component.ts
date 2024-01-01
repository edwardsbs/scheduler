import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PtoAnnual, PtoSchedule } from '../data-access/models';

@Component({
  selector: 'app-add-edit-annual-modal',
  templateUrl: './add-edit-annual-modal.component.html',
  styleUrls: ['./add-edit-annual-modal.component.scss']
})
export class AddEditAnnualModalComponent implements OnInit {

  ptoAnnualForm = this.fb.group({
    ptoAnnualId: new FormControl<number | undefined>(undefined),
    ptoHours: [0, Validators.required],
    carriedOverHours: [0],
    purchasedHours: [0],
    compTimeHours: [0],
    floatingHours: [0], 
    // year: [0], 
  })

  year = 0;

  // hours = ptoHoursOptions;
  // selectedDayOfWeek = "";
   
  constructor(
      private fb: FormBuilder,
      private dialogService: DialogService , 
      private dialog: DynamicDialogRef,
      private dialogConfig: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    
    const annual: PtoAnnual = this.dialogConfig.data.annual;

    this.ptoAnnualForm.patchValue({
      ptoAnnualId: annual.ptoAnnualId?? undefined,
      ptoHours: annual.ptoHours,
      carriedOverHours: annual.carriedOverHours,
      purchasedHours: annual.purchasedHours,
      compTimeHours: annual.compTimeHours,
      floatingHours: annual.floatingHours,
      // year: annual.year,
    })

    this.year = annual.year;

    // this.getDayOfWeek(new Date(annual.ptoDate));

  }

  closeDialog(data: any) {
    this.dialog.close();
  }

  saveChanges(data: any) {
    const annualEntry = this.ptoAnnualForm.value;
    // this.pto.reason = 'shut up'
    // console.log(this.dialogConfig.data.pto)
    this.dialog.close(annualEntry);
  }

  calcTotalHours() {
    const frm = this.ptoAnnualForm.controls;

    const totHours = +(+(frm.ptoHours.value?? 0) + 
      +(frm.carriedOverHours.value?? 0) + 
      +(frm.compTimeHours.value?? 0) + 
      +(frm.purchasedHours.value?? 0) +
      +(frm.floatingHours.value?? 0)
      )

      // console.log(frm, totHours)

      return totHours?? 0;
  }

  // getDayOfWeek(val: Date) {
  //   this.selectedDayOfWeek = formatDate(val, 'EEEE', 'en-US').toString();
  // }

}
