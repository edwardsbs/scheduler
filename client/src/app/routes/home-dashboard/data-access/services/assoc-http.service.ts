import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Associate } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssocHttpService {

  apiPath = environment.apiUrl + "api/Associates";
  
constructor(
  private readonly http: HttpClient
  ) { }

  getAssocs(): Observable<Associate[]> {
    return this.http.get<Associate[]>(`${this.apiPath}/all`)
  }

}
