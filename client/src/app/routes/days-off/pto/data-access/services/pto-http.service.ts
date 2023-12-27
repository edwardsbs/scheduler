import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PtoSchedule } from '../models';

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

}
