import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewPto, NewPtoAnnual, PtoAnnual, PtoSchedule } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PtoHttpService {

  apiPath = "https://localhost:44318/Pto"

  constructor(
    private http: HttpClient
  ) { }

  getPtoScheduleFromYear(year: number): Observable<PtoSchedule[]> {
    return this.http.get<PtoSchedule[]>(
      `${this.apiPath}/year/${year}`
    )
  }

  getPtoAnnualFromYear(year: number): Observable<PtoAnnual> {
    return this.http.get<PtoAnnual>(
      `${this.apiPath}/pto-annual/${year}`
    )
  }

  editPto(pto: PtoSchedule): Observable<void> {
    return this.http.put<void>(
      `${this.apiPath}/edit-pto`,
      {
        ptoScheduleId: pto.ptoScheduleId,
        hours: pto.hours,
        isScheduled: pto.isScheduled,
        isTaken: pto.isTaken,
        ptoDate: pto.ptoDate,
        reason: pto.reason,
      }
    )
  }

  addPto(pto: NewPto): Observable<void> {
    return this.http.post<void>(
      `${this.apiPath}/add-pto`,
      {
        hours: pto.hours,
        isScheduled: pto.isScheduled,
        isTaken: pto.isTaken,
        ptoDate: pto.ptoDate,
        reason: pto.reason,
      }
    )
  }

  addPtoAnnual(pto: NewPtoAnnual): Observable<PtoAnnual> {
    console.log('frm post', pto)
    return this.http.post<PtoAnnual>(
      `${this.apiPath}/add-pto-annual`,
      {
        ptoHours: pto.ptoHours,
        carriedOverHours: pto.carriedOverHours,
        purchasedHours: pto.purchasedHours,
        compTimeHours: pto.compTimeHours,
        floatingHours: pto.floatingHours,
        year: pto.year,
      }
    )
  }

}
