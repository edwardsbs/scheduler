import { createActionGroup, props } from '@ngrx/store';

export const SchedulerActions = createActionGroup({
    source: 'Scheduler',
    events: {
        'Set Year': props<{ year: number }>(),
        'Set Day': props<{ day: Date }>()
    }
})