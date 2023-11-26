import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysComponent } from './holidays.component';
import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidayStore } from './holidays.store';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HolidaysRoutingModule,
    HttpClientModule
  ],
  declarations: [HolidaysComponent],
  providers: [HolidayStore]
})
export class HolidaysModule { }
