import { createAction, props } from "@ngrx/store";

// export const getSelectedDate = createAction('[Time Tracking] - Get Selected Date');

export const setSelectedDate = createAction(
    '[Time Tracking] - Set Selected Date',
    props<{ selectedDate: Date }>()
    );