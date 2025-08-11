import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Holiday, HolidayDate } from '../models';
import { Observable, from, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HolidaysHttpService {
  // http://localhost:37927/swagger/index.html
  //https://localhost:44318/swagger/index.html
  apiPath = "https://localhost:44338/Holidays"

  constructor(
    private http: HttpClient
  ) { }


  getAllHolidayDates(): Observable<HolidayDate[]> {

    // const rs: HolidayDate[] = [];
    // const path = `${this.apiPath}/all-holiday-dates`;
    return  this.http.get<HolidayDate[]>(
      `${this.apiPath}/all-holiday-dates`
    ) 
    
    // const r = results.pipe(
    //   map(x => 
    //   x.map(y => rs.push(y))
    // ))

    // console.log('hol', rs)     
    
    // return results
  }

  getAllHolidayDatesForYear(year: number): Observable<HolidayDate[]> {
    return  this.http.get<HolidayDate[]>(
      `${this.apiPath}/all-holiday-dates/${year}`
    ) 
  }
  
  addHolidayDate(holiday: HolidayDate): Observable<HolidayDate> {
    return  this.http.post<HolidayDate>(
      `${this.apiPath}/add-holiday-date`,
      {
        holidayId: holiday.holidayId,
        holidayDate: holiday.observeDate,
      }
    ) 
  }

  saveHolidayDate(holiday: HolidayDate) {
    return  this.http.put(
      `${this.apiPath}/edit-holiday-date`,
      {
        holidayDateId: holiday.holidayDateId,
        holidayDate: holiday.observeDate
      }
    ) 
  }

  getAllHolidays(): Observable<Holiday[]> {

    // const rs: HolidayDate[] = [];
    const path = `${this.apiPath}/all-holidays`;
    console.log('path', path)     
    return  this.http.get<Holiday[]>(path)
    
    // const r = results.pipe(
    //   map(x => 
    //   x.map(y => rs.push(y))
    // ))

    // console.log('hol', rs)     
    
    // return results
  }


}
