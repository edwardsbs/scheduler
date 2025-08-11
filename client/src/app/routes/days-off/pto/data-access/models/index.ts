import { formatDate } from '@angular/common';

export type PtoSchedule = {
    ptoScheduleId: number | undefined;
    ptoDate: Date | string;
    reason: string | null;
    hours: number;
    isScheduled: boolean;
    isTaken: boolean;
    takenAsCompTime: boolean;
    year: number;
    dayOfWeek?: string;
    burndownHours: number;
    burndownDays: number;
    isHoliday: boolean;
}

export const initialPtoSchedule: PtoSchedule = {
    ptoScheduleId: undefined,
    ptoDate: new Date(),
    reason: '',
    hours: 0,
    isScheduled: false,
    isTaken: false,
    takenAsCompTime: false,
    year: new Date().getFullYear(),
    burndownDays: 0,
    burndownHours: 0,
    isHoliday: false,
}

export type NewPto = Pick<PtoSchedule, 
    'ptoDate' 
    | 'reason'
    | 'hours'
    | 'isScheduled'
    | 'isTaken'
> 

export type PtoAnnual = {
    ptoAnnualId: number;
    ptoHours: number;
    carriedOverHours: number;
    purchasedHours: number;
    compTimeHours: number;
    floatingHours: number;
    ptoDays: number | null;
    yearId: number;
    year: number;
    totalPtoHours: number;
}

export type NewPtoAnnual = Pick<PtoAnnual, 
    'ptoHours' 
    | 'carriedOverHours'
    | 'purchasedHours'
    | 'compTimeHours'
    | 'floatingHours'
    | 'year'
> 