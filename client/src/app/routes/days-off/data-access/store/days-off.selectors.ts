import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DaysOffState } from "./days-off.state";

export const daysOffFeatureName = 'DaysOff';

const featureSelector = createFeatureSelector<DaysOffState>(daysOffFeatureName);

export const daysOffEntities = createSelector(
    featureSelector,
    state => state.entities
) ;

export const daysOffIds = createSelector(
    featureSelector,
    state => state.ids
) ;