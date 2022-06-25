import { Component, OnInit } from '@angular/core';
import {CloudData} from "angular-tag-cloud-module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {

  constructor(private router: Router) { }
  activeTopic = 0;
  activeSentiment = 0;
  day = 21;
  legendTitle = 'Sentiment on ' + this.day + '/5/2022';
  colorNeg = '#ff4d4d';
  colorPos = '#79ff4d';

  data: CloudData[][] = [
    [
      {text: 'Tree', weight: 15, color: this.colorPos},
      {text: 'Analysis', weight: 12, color: this.colorPos},
      {text: 'Dislike', weight: 18, color: this.colorPos},
      {text: 'Example', weight: 12, color: this.colorPos},
      {text: 'Sentiment', weight: 16, color: this.colorPos},
      {text: 'Name', weight: 11, color: this.colorPos},
      {text: 'Words', weight: 14, color: this.colorPos},
      {text: 'University', weight: 13, color: this.colorPos},
      {text: 'News', weight: 10.5, color: this.colorPos},
      {text: 'Like', weight: 17, color: this.colorPos},
      {text: 'Table', weight: 14, color: this.colorPos},
      {text: 'Chair', weight: 12, color: this.colorPos},
      {text: 'Laptop', weight: 18, color: this.colorPos},
      {text: 'Today', weight: 12, color: this.colorPos},
      {text: 'Tomorrow', weight: 16, color: this.colorPos},
      {text: 'Yesterday', weight: 11, color: this.colorPos},
      {text: 'Person', weight: 14, color: this.colorPos},
      {text: 'Announce', weight: 13, color: this.colorPos},
      {text: 'Traffic', weight: 10.5, color: this.colorPos},
      {text: 'Weather', weight: 17, color: this.colorPos}
    ],
    [
      {text: 'Tree', weight: 15, color: this.colorNeg},
      {text: 'Analysis', weight: 12, color: this.colorNeg},
      {text: 'Dislike', weight: 18, color: this.colorNeg},
      {text: 'Example', weight: 12, color: this.colorNeg},
      {text: 'Sentiment', weight: 16, color: this.colorNeg},
      {text: 'Name', weight: 11, color: this.colorNeg},
      {text: 'Words', weight: 14, color: this.colorNeg},
      {text: 'University', weight: 13, color: this.colorNeg},
      {text: 'News', weight: 10.5, color: this.colorNeg},
      {text: 'Like', weight: 17, color: this.colorNeg},
      {text: 'Table', weight: 14, color: this.colorNeg},
      {text: 'Chair', weight: 12, color: this.colorNeg},
      {text: 'Laptop', weight: 18, color: this.colorNeg},
      {text: 'Today', weight: 12, color: this.colorNeg},
      {text: 'Tomorrow', weight: 16, color: this.colorNeg},
      {text: 'Yesterday', weight: 11, color: this.colorNeg},
      {text: 'Person', weight: 14, color: this.colorNeg},
      {text: 'Announce', weight: 13, color: this.colorNeg},
      {text: 'Traffic', weight: 10.5, color: this.colorNeg},
      {text: 'Weather', weight: 17, color: this.colorNeg}
    ],
    [
      {text: 'Tree', weight: 15, color: this.colorPos},
      {text: 'Analysis', weight: 12, color: this.colorPos},
      {text: 'Dislike', weight: 18, color: this.colorPos},
      {text: 'Example', weight: 12, color: this.colorPos},
      {text: 'Sentiment', weight: 16, color: this.colorPos},
      {text: 'Name', weight: 11, color: this.colorPos},
      {text: 'Words', weight: 14, color: this.colorPos},
      {text: 'University', weight: 13, color: this.colorPos},
      {text: 'News', weight: 10.5, color: this.colorPos},
      {text: 'Like', weight: 17, color: this.colorPos},
      {text: 'Tree', weight: 15, color: this.colorNeg},
      {text: 'Analysis', weight: 12, color: this.colorNeg},
      {text: 'Dislike', weight: 18, color: this.colorNeg},
      {text: 'Example', weight: 12, color: this.colorNeg},
      {text: 'Sentiment', weight: 16, color: this.colorNeg},
      {text: 'Name', weight: 11, color: this.colorNeg},
      {text: 'Words', weight: 14, color: this.colorNeg},
      {text: 'University', weight: 13, color: this.colorNeg},
      {text: 'News', weight: 10.5, color: this.colorNeg},
      {text: 'Like', weight: 17, color: this.colorNeg},
      {text: 'Table', weight: 14, color: this.colorPos},
      {text: 'Chair', weight: 12, color: this.colorPos},
      {text: 'Laptop', weight: 18, color: this.colorPos},
      {text: 'Today', weight: 12, color: this.colorPos},
      {text: 'Tomorrow', weight: 16, color: this.colorPos},
      {text: 'Yesterday', weight: 11, color: this.colorPos},
      {text: 'Person', weight: 14, color: this.colorPos},
      {text: 'Announce', weight: 13, color: this.colorPos},
      {text: 'Traffic', weight: 10.5, color: this.colorPos},
      {text: 'Weather', weight: 17, color: this.colorPos},
      {text: 'Table', weight: 14, color: this.colorNeg},
      {text: 'Chair', weight: 12, color: this.colorNeg},
      {text: 'Laptop', weight: 18, color: this.colorNeg},
      {text: 'Today', weight: 12, color: this.colorNeg},
      {text: 'Tomorrow', weight: 16, color: this.colorNeg},
      {text: 'Yesterday', weight: 11, color: this.colorNeg},
      {text: 'Person', weight: 14, color: this.colorNeg},
      {text: 'Announce', weight: 13, color: this.colorNeg},
      {text: 'Traffic', weight: 10.5, color: this.colorNeg},
      {text: 'Weather', weight: 17, color: this.colorNeg}
    ]
  ]

  ngOnInit(): void {
    if (history.state.day)
      this.day = history.state.day;
    if (history.state.topic)
      this.activeTopic = history.state.topic;
    if (history.state.sentiment)
      this.activeSentiment = history.state.sentiment;
  }

  chooseData(topic: number) { this.activeTopic = topic; }
  chooseSentiment(sentiment: number) { this.activeSentiment = sentiment; }

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

  gotoPieChart() {
    this.router.navigate(['/pie-chart'],
      { state: { day: this.day } });
  }

}
