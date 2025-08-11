import { dateNotSet } from ".";

export type TimeTrackingState = {
    selectedDate: Date 

};

export const intialTimeTrackingState = {
    selectedDate: dateNotSet
}