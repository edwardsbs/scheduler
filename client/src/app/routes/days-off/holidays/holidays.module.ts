import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidayStore } from './holidays.store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ imports: [CommonModule,
        HolidaysRoutingModule], providers: [HolidayStore, provideHttpClient(withInterceptorsFromDi())] })
export class HolidaysModule { }
