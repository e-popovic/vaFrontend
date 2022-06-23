import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {calendarData} from "../interfaces/calendarData";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http:HttpClient) { }

  // get data for the calendar view from backend
  getCalendarReading(day : string): Observable<calendarData>{
    return this.http.get<calendarData>("http://localhost:5000/"+day+".05.2022");
  }

}
