import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysOffComponent } from './days-off.component';
import { DaysOffRoutingModule } from './days-off-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { HolidaysModule } from './holidays/holidays.module';
import { HolidaysComponent } from './holidays/holidays.component';
import {MatTableModule} from '@angular/material/table';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PtoComponent } from './pto/pto.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DaysOffStore } from './days-off.store';
import { FormsModule } from '@angular/forms';
import { PtoStore } from './pto/pto.store';
import { ButtonModule } from 'primeng/button';
import { AddEditModalComponent } from './pto/add-edit-modal/add-edit-modal.component';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    DaysOffRoutingModule,
    MatTabsModule,
    MatIconModule,
    HolidaysModule,
    MatTableModule,
    CardModule,
    TabViewModule,
    TableModule,
    SelectButtonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    ToastModule,
  ],
  declarations: [DaysOffComponent, HolidaysComponent, PtoComponent, AddEditModalComponent],
  providers: [DaysOffStore, PtoStore, DialogService, MessageService]
})
export class DaysOffModule { }
