import { formatDate } from '@angular/common';

export type PtoSchedule = {
    ptoScheduleId: number | undefined;
    ptoDate: Date | string;
    reason: string | null;
    hours: number;
    isScheduled: boolean;
    isTaken: boolean;
    year: number;
    dayOfWeek?: string;
    burndownHours: number;
    burndownDays: number;
}

export const initialPtoSchedule: PtoSchedule = {
    ptoScheduleId: undefined,
    ptoDate: new Date(),
    reason: '',
    hours: 0,
    isScheduled: false,
    isTaken: false,
    year: new Date().getFullYear(),
    burndownDays: 0,
    burndownHours: 0,
}

export type NewPto = Pick<PtoSchedule, 
    'ptoDate' 
    | 'reason'
    | 'hours'
    | 'isScheduled'
    | 'isTaken'
> 

export class PtoScheduleMethods {
    value: PtoSchedule;
 
    constructor(value: PtoSchedule) {
        this.value = value;
    }
 
    addDayOfWeek(): PtoSchedule {
        return {
            ...this.value,
            dayOfWeek: formatDate(this.value.ptoDate, 'EEEE', 'en-US').toString()
        }
    }

    // isSome(): boolean {
    //     return this.value != null;  
    // } 
 
    // isNone(): boolean {
    //     return !this.isSome();
    // }
}