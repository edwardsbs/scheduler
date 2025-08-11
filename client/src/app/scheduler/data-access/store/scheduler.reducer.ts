import { ActionReducerMap } from "@ngrx/store";
import { SchedulereState } from "./scheduler.state";
import { daysOffReducers } from "src/app/routes/days-off/data-access/store/days-off.reducer";
import { timeTrackingReducers } from "./time-tracking/time-tracking.reducer";
import { timeTrackingFeatureName } from "./time-tracking/time-tracking.selectors";
import { daysOffFeatureName } from "src/app/routes/days-off/data-access/store/days-off.selectors";

export const schedulerReducers: ActionReducerMap<SchedulereState> = {
    [daysOffFeatureName]: daysOffReducers,
    [timeTrackingFeatureName]: timeTrackingReducers,
}