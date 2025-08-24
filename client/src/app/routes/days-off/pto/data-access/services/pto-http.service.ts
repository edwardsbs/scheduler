import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewPto, NewPtoAnnual, PtoAnnual, PtoSchedule } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PtoHttpService {

  apiPath = environment.apiUrl + "Pto"

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
        takenAsCompTime: pto.takenAsCompTime,
        ptoDate: pto.ptoDate,
        reason: pto.reason,
      }
    )
  }

  addPto(pto: NewPto[]): Observable<void> {
    return this.http.post<void>(
      `${this.apiPath}/add-pto`,
      {
        newPtos: pto,
      }
    )
  }

  addPtoAnnual(pto: NewPtoAnnual): Observable<PtoAnnual> {
    console.log('http call', pto)
    return this.http.post<PtoAnnual>(
      `${this.apiPath}/add-pto-annual`,
      {
        year: pto.year,
        ptoHours: pto.ptoHours,
        carriedOverHours: pto.carriedOverHours,
        compTimeHours: pto.compTimeHours,
        purchasedHours: pto.purchasedHours,
        floatingHours: pto.floatingHours,
      }
    )
  }

}
