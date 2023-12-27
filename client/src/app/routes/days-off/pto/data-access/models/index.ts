export type PtoSchedule = {
    ptoScheduleId: number | undefined;
    ptoDate: Date | string;
    reason: string | null;
    hours: number;
    isScheduled: boolean;
    isTaken: boolean;
    year: number;
    dayOfWeek?: string;
}

export const initialPtoSchedule: PtoSchedule = {
    ptoScheduleId: undefined,
    ptoDate: new Date(),
    reason: '',
    hours: 0,
    isScheduled: false,
    isTaken: false,
    year: new Date().getFullYear(),
}