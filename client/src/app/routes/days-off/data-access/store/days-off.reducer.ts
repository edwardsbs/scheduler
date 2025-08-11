import { DaysOffActions } from './days-off.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { DaysOffState, DaysOffStateItems } from './days-off.state';

export const initialState: DaysOffStateItems | undefined = { 
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
);

export function daysOffReducers(state: DaysOffStateItems | undefined, action: Action) {
    return daysOffReducer(state, action)
}





