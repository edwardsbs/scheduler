import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Holiday, HolidayDate } from '../holidays/data-access/models';
import { HolidaysHttpService } from '../holidays/data-access/services/holidays-http.service';
import { DaysOffStore } from '../days-off.store';
import { skip, tap, withLatestFrom } from 'rxjs';


export interface HolidayScheduleState {
    holidayDates: HolidayDate[],
}

const initialHolidayScheduleState: HolidayScheduleState = {
    holidayDates: []
}

@Injectable()
export class HolidayScheduleStore extends ComponentStore<HolidayScheduleState> {

    constructor(
        private readonly http: HolidaysHttpService,
        private readonly daysOffStore: DaysOffStore,
    )
    {
        super(initialHolidayScheduleState)

        setTimeout(() => {
            this.getHolidayDates()
        })
    }


    //SELECTORS
    holidayDates$ = this.select(x => x.holidayDates);

    selectedYear$ = this.daysOffStore.selectedYear$;

    //UPDATERS
    setHolidayDates = this.updater((state, holidays: HolidayDate[]) =>{
        return {
            ...state,
            holidayDates: holidays
        }
    })


    //EFFECTS
    yearSelectionChange = this.effect(() =>
        this.daysOffStore.selectedYear$.pipe(
            skip(1),
            tap((y: number) => {
                const results = this.http.getAllHolidayDatesForYear(y);
                this.setHolidayDates(results)
            })
        )
    ) 

    getHolidayDates = this.effect((trigger$) => 
        trigger$.pipe(
            withLatestFrom(this.selectedYear$),
            tap(([_, yr]) => {
                const results = this.http.getAllHolidayDatesForYear(yr)
                this.setHolidayDates(results)
            })
        )           
    )
}