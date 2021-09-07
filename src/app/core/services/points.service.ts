import {Injectable} from '@angular/core';

import {Point} from "../models/point.model";
import {Taxi} from "../models/taxi.model";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  constructor(private http: HttpClient) {
  }

  getPoints(taxi: Taxi, date: string): Observable<Point[]> {
    const params = new HttpParams()
      .set('date', date);
    return this.http.get<Point[]>(`http://localhost:8080/api/trajectories/${taxi.id}`, {params})
  }
}
