import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PtoSchedule, initialPtoSchedule } from '../data-access/models';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {

  visible: boolean = false;
  pto = initialPtoSchedule;
  // @Input() pto: PtoSchedule = initialPtoSchedule;
  
  constructor(
      // private formBuilder: FormBuilder,
      // private route: ActivatedRoute,
      // private router: Router,
      private dialogService: DialogService , 
      private dialog: DynamicDialogRef,
      private dialogConfig: DynamicDialogConfig,
  ) { 
    // super(dialogRef)
  }

  ngOnInit() {
    this.pto = this.dialogConfig.data.pto;
  }

  showDialog() {
      this.visible = true;
  }

  closeDialog(data: any) {
    this.dialog.close();
}

saveChanges(data: any) {
    this.pto = this.dialogConfig.data.pto
    this.pto.reason = 'shut up'
    // console.log(this.dialogConfig.data.pto)
    this.dialog.close(this.pto);
}

}
