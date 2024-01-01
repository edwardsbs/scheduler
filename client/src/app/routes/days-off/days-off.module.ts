import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysOffComponent } from './days-off.component';
import { DaysOffRoutingModule } from './days-off-routing.module';
import { HolidaysModule } from './holidays/holidays.module';
import { HolidaysComponent } from './holidays/holidays.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { PtoComponent } from './pto/pto.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DaysOffStore } from './days-off.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PtoStore } from './pto/pto.store';
import { AddEditModalComponent } from './pto/add-edit-modal/add-edit-modal.component';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PtoScheduleComponent } from './pto/pto-schedule/pto-schedule.component';
import { AddEditAnnualModalComponent } from './pto/add-edit-annual-modal/add-edit-annual-modal.component';

@NgModule({
  imports: [
    CommonModule,
    DaysOffRoutingModule,
    HolidaysModule,
    TableModule,
    TabViewModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputSwitchModule,
  ],
  declarations: [DaysOffComponent, HolidaysComponent, PtoComponent, AddEditModalComponent, PtoScheduleComponent, AddEditAnnualModalComponent],
  providers: [DaysOffStore, PtoStore, DialogService, MessageService]
})
export class DaysOffModule { }
