import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {calendarData} from "../interfaces/calendarData";
import {pictogramData} from "../interfaces/pictogramData";
import {commentData} from "../interfaces/commentData";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http:HttpClient) { }
  // get data for the calendar view from backend
  getCalendarReading(day : string): Observable<calendarData>{
    return this.http.get<calendarData>("http://localhost:5000/calenderview/"+day+".05.2022");
  }

  // get data for the pictogram view from backend
  getPictogramReading(day : string): Observable<pictogramData[]>{
    return this.http.get<pictogramData[]>("http://localhost:5000/pictogram/"+day+".05.2022");
  }

  // get data for the person view from backend
  getCommentReading(day : string, sentiment: string): Observable<commentData>{
    return this.http.get<commentData>("http://localhost:5000/personview/"+day+".05.2022/"+sentiment);
  }
}
