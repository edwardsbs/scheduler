import { Holiday, HolidayDate } from './data-access/models/index';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { map, switchMap, tap } from 'rxjs';
import { HolidaysHttpService } from './data-access/services/holidays-http.service';

export interface HolidayState {
    holidayDates: HolidayDate[],
    holidays: Holiday[],
}

const initialHolidayState: HolidayState = {
    holidayDates: [],
    holidays: [],
}

@Injectable()
export class HolidayStore extends ComponentStore<HolidayState> {

    constructor(
        private readonly http: HolidaysHttpService
    ) {
        super(initialHolidayState)
        
        setTimeout(() => {
            this.getHolidays(),
            this.getHolidayDates()
        })
    }

    //SELECTORS
    holidayDates$ = this.select(x => x.holidayDates);
    holidays$ = this.select(x => x.holidays);

    //UPDATERS
    setHolidayDates = this.updater((state, holidays: HolidayDate[]) =>{
        return {
            ...state,
            holidayDates: holidays
        }
    })

    setHolidays = this.updater((state, holidays: Holiday[]) =>{
        return {
            ...state,
            holidays: holidays
        }
    })


    //EFFECTS
    getHolidayDates = this.effect((trigger$) => 
        trigger$.pipe(
            tap(() => {
                const results = this.http.getAllHolidayDates()
                this.setHolidayDates(results)
            })
        )           
    )

    getHolidays = this.effect((trigger$) => 
        trigger$.pipe(
            tap(() => {
                const results = this.http.getAllHolidays()
                this.setHolidays(results)
            })
        )        
    )
    

}