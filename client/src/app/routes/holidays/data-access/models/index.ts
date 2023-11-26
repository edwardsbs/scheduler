export type Holiday = {
    holidayId: number;
    holidayName: string;
    isPlantObserved: boolean;
    note: string | null;
    //HolidayDates: HolidayDate[] | null;
}

export type HolidayDate = {
    holidayDateId: number;
    observeDate: Date | string;
    yearId: number;
    year?: Year;
    holidayId: number | null;
    holiday?: Holiday;
}

export type Year = {
    yearId: number;
    yearNumber: number;
    //HolidayDates: HolidayDate[] | null;
}