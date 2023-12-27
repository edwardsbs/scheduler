import { Year } from '../models';
import { PtoSchedule } from './../../pto/data-access/models/index';
import { createActionGroup, props } from '@ngrx/store';

export const DaysOffActions = createActionGroup({
    source: 'DaysOff',
    events: {
        'Set Year': props<{ year: number }>(),
        'Set Day': props<{ day: Date }>(),
        'Add Day Off': props<{ pto: PtoSchedule }>(),
        'Remove Day Off': props<{ pto: PtoSchedule }>(),
    }
})

