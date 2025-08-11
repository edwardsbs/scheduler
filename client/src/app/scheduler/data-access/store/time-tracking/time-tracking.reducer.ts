import { Action, createReducer, on } from "@ngrx/store";
import { TimeTrackingState, intialTimeTrackingState } from "./time-tracking.state";
import { setSelectedDate } from "./time-tracking.actions";

const timeTrackingReducer = createReducer(
    intialTimeTrackingState,

    on(setSelectedDate, (state, { selectedDate }) => {
        return {
            ...state,
            selectedDate: selectedDate
        }
    })
);

export function timeTrackingReducers(state: TimeTrackingState | undefined, action: Action) {
    return timeTrackingReducer(state, action)
}