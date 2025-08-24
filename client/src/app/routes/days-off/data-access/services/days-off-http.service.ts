import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Year } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaysOffHttpService {

  apiPath = environment.apiUrl + "Scheduler"

  constructor(
    private http: HttpClient
  ) { }

  getYears(): Observable<Year[]> {
    return this.http.get<Year[]>(
      `${this.apiPath}/years`
    )
  }

}
