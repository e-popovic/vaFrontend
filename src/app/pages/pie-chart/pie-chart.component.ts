import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AnalyticsService} from "../../services/analytics.service";
import {pictogramData} from "../../interfaces/pictogramData";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor(private router: Router, private pictogramService: AnalyticsService) { }
  activeTopic = 0;

  day = 1;
  legendTitle = '';
  chartData : pictogramData[] | undefined;
  activeData = [
    {
      "name": "Positive",
      "value": 0,
      "extra": {
        "code": "pos"
      }
    },
    {
      "name": "Negative",
      "value": 0,
      "extra": {
        "code": "neg"
      }
    }
  ]
  activeTopic1 = true;
  activeTopic2 = true;
  activeTopic3 = true;

  ngOnInit(): void {
    if (history.state.day) {
      this.day = history.state.day;
      this.legendTitle = 'Sentiment on ' + this.day + '/5/2022';
      let dayString = ("0" + this.day).slice(-2);
      this.pictogramService.getPictogramReading(dayString)
        .subscribe(data => {
          this.chartData = data;
          this.activeData[0]['value'] = this.chartData[0]['positive_comments'] +
            this.chartData[1]['positive_comments'] + this.chartData[2]['positive_comments'];
          this.activeData[1]['value'] = this.chartData[0]['negative_comments'] +
            this.chartData[1]['negative_comments'] + this.chartData[2]['negative_comments'];
        });
    }

  }

  chooseData(topic: number) {
    if(this.chartData == undefined){return;}
    switch(topic) {
      case 0:
        this.activeTopic1 = !this.activeTopic1;
        break;
      case 1:
        this.activeTopic2 = !this.activeTopic2;
        break;
      case 2:
        this.activeTopic3 = !this.activeTopic3;
        break;
    }
    this.calculatePictogramPeople(this.activeTopic1, this.activeTopic2, this.activeTopic3);
    this.activeData = [...this.activeData];

    // /*At least one topic must be selected */
    if((this.activeTopic1 || this.activeTopic2 || this.activeTopic3) == false) {
      this.chooseData(topic);
    }
  }

  calculatePictogramPeople(t1: boolean, t2:boolean, t3:boolean) {
    if(this.chartData == undefined){return;}
    console.log(t1, t2, t3);
    if(t1 && t2 && t3) {
      this.activeData[0]['value'] = this.chartData[0]["positive_comments"] + this.chartData[1]["positive_comments"] + this.chartData[2]["positive_comments"];
      this.activeData[1]['value'] = this.chartData[0]["negative_comments"] + this.chartData[1]["negative_comments"] + this.chartData[2]["negative_comments"];
    } else if (t1 && t2) {
      this.activeData[0]['value'] = this.chartData[0]["positive_comments"] + this.chartData[1]["positive_comments"];
      this.activeData[1]['value'] = this.chartData[0]["negative_comments"] + this.chartData[1]["negative_comments"];
    } else if (t1 && t3) {
      this.activeData[0]['value'] = this.chartData[0]["positive_comments"] + this.chartData[2]["positive_comments"];
      this.activeData[1]['value'] = this.chartData[0]["negative_comments"] + this.chartData[2]["negative_comments"];
    } else if (t2 && t3) {
      this.activeData[0]['value'] = this.chartData[1]["positive_comments"] + this.chartData[2]["positive_comments"];
      this.activeData[1]['value'] = this.chartData[1]["negative_comments"] + this.chartData[2]["negative_comments"];
    } else if (t1) {
      this.activeData[0]['value'] = this.chartData[0]["positive_comments"]
      this.activeData[1]['value'] = this.chartData[0]["negative_comments"];
    } else if (t2) {
      this.activeData[0]['value'] = this.chartData[1]["positive_comments"]
      this.activeData[1]['value'] = this.chartData[1]["negative_comments"];
    } else if (t3) {
      this.activeData[0]['value'] = this.chartData[2]["positive_comments"]
      this.activeData[1]['value'] = this.chartData[2]["negative_comments"];
    }
  }

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

      this.activeTopic1 = true;
      this.activeTopic2 = true;
      this.activeTopic3 = true;
      let dayString = ("0" + this.day).slice(-2);
      this.pictogramService.getPictogramReading(dayString)
        .subscribe(data => {
          this.chartData = data;
          this.activeData[0]['value'] = this.chartData[0]['positive_comments'] +
            this.chartData[1]['positive_comments'] + this.chartData[2]['positive_comments'];
          this.activeData[1]['value'] = this.chartData[0]['negative_comments'] +
            this.chartData[1]['negative_comments'] + this.chartData[2]['negative_comments'];
        });
      this.activeData = [...this.activeData];
    }
    else if (!direction && this.day > 1){
      this.day--;
      this.legendTitle = 'Sentiment on ' + this.day + '/5/2022';

      this.activeTopic1 = true;
      this.activeTopic2 = true;
      this.activeTopic3 = true;
      let dayString = ("0" + this.day).slice(-2);
      this.pictogramService.getPictogramReading(dayString)
        .subscribe(data => {
          this.chartData = data;
          this.activeData[0]['value'] = this.chartData[0]['positive_comments'] +
            this.chartData[1]['positive_comments'] + this.chartData[2]['positive_comments'];
          this.activeData[1]['value'] = this.chartData[0]['negative_comments'] +
            this.chartData[1]['negative_comments'] + this.chartData[2]['negative_comments'];
        });
      this.activeData = [...this.activeData];
    }
  }

}
