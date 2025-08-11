import { DaysOffState, DaysOffStateItems } from "src/app/routes/days-off/data-access/store/days-off.state";
import { TimeTrackingState } from "./time-tracking/time-tracking.state";
import { timeTrackingFeatureName } from "./time-tracking/time-tracking.selectors";
import { daysOffFeatureName } from "src/app/routes/days-off/data-access/store/days-off.selectors";

export type SchedulereState = {
    [daysOffFeatureName]: DaysOffStateItems;
    [timeTrackingFeatureName]: TimeTrackingState;
}