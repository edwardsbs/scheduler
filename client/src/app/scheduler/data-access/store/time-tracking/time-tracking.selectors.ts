import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TimeTrackingState } from "./time-tracking.state";

export const timeTrackingFeatureName = 'TimeTracking';

const featureSelector = createFeatureSelector<TimeTrackingState>(timeTrackingFeatureName);

export const selectedDate = createSelector(
    featureSelector,
    state => state.selectedDate
) ;