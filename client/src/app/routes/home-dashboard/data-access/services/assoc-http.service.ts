import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Associate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AssocHttpService {

constructor(
  private readonly http: HttpClient
  ) { }

  getAssocs(): Observable<Associate[]> {
    return this.http.get<Associate[]>(`https://localhost:44395/api/Associates/all`)
  }

}
