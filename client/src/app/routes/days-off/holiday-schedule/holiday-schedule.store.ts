import { HolidayDate } from './../holidays/data-access/models/index';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HolidaysHttpService } from '../holidays/data-access/services/holidays-http.service';
import { DaysOffStore } from '../days-off.store';
import { Observable, map, skip, tap, withLatestFrom } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';


export interface HolidayScheduleState {
    holidayDates: HolidayDate[],
}

const initialHolidayScheduleState: HolidayScheduleState = {
    holidayDates: []
}

@Injectable()
export class HolidayScheduleStore extends ComponentStore<HolidayScheduleState> {

    fgHolidaySchedule = this.fb.group({
        observeDate: new FormControl<Date | null>(null),
    })

    constructor(
        private readonly http: HolidaysHttpService,
        private readonly daysOffStore: DaysOffStore,
        private fb: FormBuilder,
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

    addHolidayDate = this.updater((state, holiday: HolidayDate) => {
        
        let holidays = state.holidayDates;
        const indexToUpdate = state.holidayDates.findIndex(item => item.holidayId === holiday.holidayId);
        const updatedHoliday = {
            ...holidays[indexToUpdate],
            observeDate: holiday.observeDate,
            holidayDateId: holiday.holidayDateId
        } //to preserve the Holiday Name
        holidays[indexToUpdate] = updatedHoliday;

        return {
            ...state,
            holidayDates: holidays
        }
    })

    updateHolidayDate = this.updater((state, holiday: HolidayDate) => {
        
        let holidays = state.holidayDates;
        const indexToUpdate = state.holidayDates.findIndex(item => item.holidayDateId === holiday.holidayDateId);
        holidays[indexToUpdate] = holiday;

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

    editOrAddHolidayDate = this.effect((holiday$: Observable<HolidayDate>) =>
        holiday$.pipe(
            tap((hol) => {
                if(hol.holidayDateId === 0 || hol.holidayDateId === null) {
                    this.http.addHolidayDate(hol).subscribe((res) => {
                            this.addHolidayDate(res)
                        },
                        (err: Error) => {                        
                            // this.messageService.add({ severity: 'error', summary: 'PTO Not Saved', detail: err.message?? '' })
                            return console.log(err)
                        })
                } else {
                    this.http.saveHolidayDate(hol).subscribe(() => {
                        console.log('editing', hol)
                        // tap(() => {
                           this.updateHolidayDate(hol);
                        // })

                    })                    
                }
            })
        )
    )
}