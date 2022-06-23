import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AnalyticsService} from "../../services/analytics.service";
import {calendarData} from "../../interfaces/calendarData";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private router: Router, private calendarService: AnalyticsService) { }
  day = 0;
  sentiments = [""];
  month = 5;
  year = 2022;
  activeMonth = "May";
  currentWeekDay = "Sunday"
  index = new Array<number>();
  public dayInfo : calendarData | undefined;
  public monthInfo : calendarData | undefined;
  public sentimentsMonth = [""];

  weekDays = ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  "Sunday", "Monday", "Tuesday"]
  isShown: boolean = false;

  showInfos(thisDay: number) {
    if(thisDay == 0 || thisDay == this.day) {
      this.day = 0;
      this.isShown = false;
    } else{
      this.getDay(thisDay);
      this.isShown = true;
    }
  }

  ngOnInit(): void {
    for(let n = 1; n <= 31; n++){
      if(n % 2 == 0) {
        this.sentiments.push("negativ");
      } else {
        this.sentiments.push("positiv");
      }
      this.index.push(n);
      this.calendarService.getCalendarReading(("0" + n).slice(-2))
        .subscribe(data => {
          this.sentimentsMonth[n] = data["0"]["3"];
        });
    }
    this.calendarService.getCalendarReading("01")
      .subscribe(data => {
        this.monthInfo = data;
      });
  }

  getDay(thisDay: number) {
    this.day = thisDay;
    this.currentWeekDay = this.weekDays[thisDay];

    let dayString = ("0" + thisDay).slice(-2);
    this.calendarService.getCalendarReading(dayString)
      .subscribe(data => {
        this.dayInfo = data;
      });

  }

  gotoDetailView(routeTo: number) {
    if(routeTo == 0) {
      this.router.navigate(['/pictogram'],
      { state: { day: this.day } });
    } else {
      this.router.navigate(['/pie-chart'],
      { state: { day: this.day } });
    }
  }

  changeDate(direction: number) {
    if (direction){
      this.month++;
      if(this.month == 13){
        this.year++;
        this.month = 1;
      }
    }
    else if (!direction){
      this.month--;
      if(this.month == 0) {
        this.year--;
        this.month = 12;
      }
    }

    switch(this.month) {
      case 1:
        this.activeMonth = "January"
        break;
      case 2:
        this.activeMonth = "February"
        break;
      case 3:
        this.activeMonth = "March"
        break;
      case 4:
        this.activeMonth = "April"
        break;
      case 5:
        this.activeMonth = "May"
        break;
      case 6:
        this.activeMonth = "June"
        break;
      case 7:
        this.activeMonth = "July"
        break;
      case 8:
        this.activeMonth = "August"
        break;
      case 9:
        this.activeMonth = "September"
        break;
      case 10:
        this.activeMonth = "October"
        break;
      case 11:
        this.activeMonth = "November"
        break;
      case 12:
        this.activeMonth = "December"
        break;
    }
  }
}
