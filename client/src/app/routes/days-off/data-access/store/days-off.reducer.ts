import { DaysOffActions } from './days-off.actions';
import { createReducer, on } from '@ngrx/store';
import { DaysOffStateItems } from './days-off.state';

export const initialState: DaysOffStateItems = { 
    year: 2022,
    day: new Date() 
}

export const daysOffReducer = createReducer(
    initialState,
    on(DaysOffActions.setYear, (state, { year }) => {
        return {
            ...state,
            year: year
        }
    }),
    on(DaysOffActions.setDay, (state, { day }) => {
        return {
            ...state,
            day: day
        }
    })
)