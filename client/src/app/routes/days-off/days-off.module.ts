import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysOffComponent } from './days-off.component';
import { DaysOffRoutingModule } from './days-off-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { HolidaysModule } from './holidays/holidays.module';
import { HolidaysComponent } from './holidays/holidays.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    DaysOffRoutingModule,
    MatTabsModule,
    MatIconModule,
    HolidaysModule,
    MatTableModule,
  ],
  declarations: [DaysOffComponent, HolidaysComponent]
})
export class DaysOffModule { }
