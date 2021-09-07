import {Injectable} from '@angular/core';
import {Taxi} from "../models/taxi.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaxisService {

  constructor(private  http: HttpClient) {
  }

  getTaxis(query: string): Observable<Taxi[]> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', 1)
      .set('pageSize', 10);

    return this.http.get<Taxi[]>('http://localhost:8080/api/taxis', { params});
  }
}
