import { DaysOffActions } from './data-access/store/days-off.actions';
import { DaysOffHttpService } from './data-access/services/days-off-http.service';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap, map } from 'rxjs'
import { Year } from './data-access/models';
import { Store } from '@ngrx/store';

export interface DaysOffState {
    years: Year[];
    selectedYear: number;
}

const initialDaysOffState: DaysOffState = {
    years: [],
    selectedYear: 2022,
}

@Injectable()
export class DaysOffStore extends ComponentStore<DaysOffState> {

    constructor(
        private readonly http: DaysOffHttpService,
        private readonly store: Store,
        // private readonly daysOff: DaysOffActions
    ){
        super(initialDaysOffState)

        setTimeout(() => {
            this.getYears(),
            this.selectDefaultYear()
        })
    }


    //SELECTORS
    years$ = this.select(x => x.years);

    selectedYear$ = this.select(x => x.selectedYear);

    //UPDATERS
    setYearsList = this.updater((state, years: Year[]) => {
        return {
            ...state,
            years: years,
        }
    })

    setSelectedYear = this.updater((state, year: number) => {
        return {
            ...state,
            selectedYear: year,
        }
    })

    //EFFECTS
    getYears = this.effect((trigger$) => 
        trigger$.pipe(
            tap(() => {
                const results = this.http.getYears()
                    .pipe(
                        map((years: Year[]) => years.reverse())
                    )
                this.setYearsList(results);
            })
        )
    )

    selectDefaultYear = this.effect((trigger$) => 
        trigger$.pipe(
            tap(() => {
                const yr = +(new Date().getFullYear());
                this.setSelectedYear(yr);
                // this.store.dispatch(DaysOffActions.setYear({ year: yr }))
            })
        ))
}

