import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor(private router: Router) { }
  activeTopic = 0;
  day = 21;
  legendTitle = 'Sentiment on ' + this.day + '/5/2022';
  chartData = [[
    {
      "name": "Positive",
      "value": 526,
      "extra": {
        "code": "pos"
      }
    },
    {
      "name": "Negative",
      "value": 360,
      "extra": {
        "code": "neg"
      }
    }
  ],
    [
      {
        "name": "Positive",
        "value": 52,
        "extra": {
          "code": "pos"
        }
      },
      {
        "name": "Negative",
        "value": 360,
        "extra": {
          "code": "neg"
        }
      }
    ],
    [
      {
        "name": "Positive",
        "value": 486,
        "extra": {
          "code": "pos"
        }
      },
      {
        "name": "Negative",
        "value": 214,
        "extra": {
          "code": "neg"
        }
      }
    ]
  ];
  ngOnInit(): void {
  }

  chooseData(topic: number) { this.activeTopic = topic; }

  onPieSliceSelect(event: any){
    let sentiment = 0;
    if (event["name"] == "Negative")
      sentiment = 1;
    this.router.navigate(['/word-cloud'],
      { state: { topic:this.activeTopic , sentiment:sentiment, day: this.day } });
  }

  changeDate(direction: number) {
    if (direction && this.day < 31){
      this.day++;
      this.legendTitle = 'Sentiment on ' + this.day + '/5/2022';
    }
    else if (!direction && this.day > 1){
      this.day--;
      this.legendTitle = 'Sentiment on ' + this.day + '/5/2022';
    }
  }

}
