import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Year } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DaysOffHttpService {

  apiPath = "https://localhost:44338/Scheduler"

  constructor(
    private http: HttpClient
  ) { }

  getYears(): Observable<Year[]> {
    return this.http.get<Year[]>(
      `${this.apiPath}/years`
    )
  }

}
