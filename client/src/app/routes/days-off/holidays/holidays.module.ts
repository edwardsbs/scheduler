import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidayStore } from './holidays.store';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    HolidaysRoutingModule,
    HttpClientModule,
    ButtonModule,
    ReactiveFormsModule,
    InputsModule,
    GridModule,
    MatTableModule,
  ],
  // declarations: [HolidaysComponent],
  providers: [HolidayStore]
})
export class HolidaysModule { }
