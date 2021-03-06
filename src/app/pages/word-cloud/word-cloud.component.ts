import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AnalyticsService} from "../../services/analytics.service";
import { posnegCloudData, wordCloudData} from "../../interfaces/wordCloudData";

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {

  constructor(private router: Router, private wordcloudService: AnalyticsService) { }
  activeTopic = 0;
  activeSentiment = 0;
  noData = false;
  day = 1;
  colorNeg = '#ff4d4d';
  colorPos = '#79ff4d';
  cloudData : wordCloudData[] | undefined;
  activeTopic1 = false;
  activeTopic2 = false;
  activeTopic3 = false;

  activeData : posnegCloudData[] = [];

  ngOnInit(): void {
    if (history.state.day)
      this.day = history.state.day;
    if (history.state.sentiment)
      this.activeSentiment = history.state.sentiment;
    let dayString = ("0" + this.day).slice(-2);
    this.wordcloudService.getWordCloudReading(dayString)
      .subscribe(data => {
        if(data[0] == undefined || data[0] == null){this.noData = true; return;}
        this.noData = false;
        this.cloudData = data;

        if (history.state.topic){
          this.activeTopic = history.state.topic;

          let arraytopics = history.state.topic.split("|");
          if (this.cloudData !== undefined){
            for (let i = 0; i < arraytopics.length; i++){
              if (arraytopics[i] != ''){
                if (data[0]['name'] === arraytopics[i]) this.activeTopic1 = true;
                if (data[1]['name'] === arraytopics[i]) this.activeTopic2 = true;
                if (data[2]['name'] === arraytopics[i]) this.activeTopic3 = true;
              }
            }
          }
        }
        if (this.activeSentiment == 0) {
          if (this.activeTopic1) {
            this.activeData = data[0]['positive'];
          }
          if (this.activeTopic2) {
            this.activeData = this.activeData.concat(data[1]['positive']);
          }
          if (this.activeTopic3) {
            this.activeData = this.activeData.concat(data[2]['positive']);
          }
        }
        else if (this.activeSentiment == 1) {
          if (this.activeTopic1) {
            this.activeData = data[0]['negative'];
          }
          if (this.activeTopic2) {
            this.activeData = this.activeData.concat(data[1]['negative']);
          }
          if (this.activeTopic3) {
            this.activeData = this.activeData.concat(data[2]['negative']);
          }
        }
      });
  }

  // choose the active topic(s)
  chooseData(topic: number) {
    if(this.cloudData == undefined){return;}
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

    // At least one topic must be selected
    if((this.activeTopic1 || this.activeTopic2 || this.activeTopic3) == false) {
      this.chooseData(topic);
    }
  }

  // pick all the data that should be visualized (based on active topics and sentiment)
  calculatePictogramPeople(t1: boolean, t2:boolean, t3:boolean) {
    if(this.cloudData == undefined){return;}
    this.activeData = [];
    if (this.activeSentiment == 0) {
      if (t1) {
        this.activeData = this.cloudData[0]['positive'];
      }
      if (t2) {
        this.activeData = this.activeData.concat(this.cloudData[1]['positive']);
      }
      if (t3) {
        this.activeData = this.activeData.concat(this.cloudData[2]['positive']);
      }
    }
    else if (this.activeSentiment == 1) {
      if (t1) {
        this.activeData = this.cloudData[0]['negative'];
      }
      if (t2) {
        this.activeData = this.activeData.concat(this.cloudData[1]['negative']);
      }
      if (t3) {
        this.activeData = this.activeData.concat(this.cloudData[2]['negative']);
      }
    }
    else {
      if (t1) {
        this.activeData = this.cloudData[0]['negative'];
        this.activeData = this.activeData.concat(this.cloudData[0]['positive']);
      }
      if (t2) {
        this.activeData = this.activeData.concat(this.cloudData[1]['negative']);
        this.activeData = this.activeData.concat(this.cloudData[1]['positive']);
      }
      if (t3) {
        this.activeData = this.activeData.concat(this.cloudData[2]['negative']);
        this.activeData = this.activeData.concat(this.cloudData[2]['positive']);
      }
    }

    this.activeData = [...this.activeData];
  }

  // changing the chosen sentiment
  chooseSentiment(sentiment: number) {
    this.activeSentiment = sentiment;
    this.calculatePictogramPeople(this.activeTopic1, this.activeTopic2, this.activeTopic3);
  }

  // navigation through different days
  changeDate(direction: number) {
    if (direction && this.day < 31){
      this.day++;

      let dayString = ("0" + this.day).slice(-2);
      this.wordcloudService.getWordCloudReading(dayString)
        .subscribe(data => {
          if(data[0] == undefined || data[0] == null){this.noData = true; return;}
          this.noData = false;
          this.cloudData = data;
          this.activeTopic1 = true;
          this.activeTopic2 = true;
          this.activeTopic3 = true;
        });
      this.calculatePictogramPeople(this.activeTopic1, this.activeTopic2, this.activeTopic3);
    }
    else if (!direction && this.day > 1){
      this.day--;
      let dayString = ("0" + this.day).slice(-2);
      this.wordcloudService.getWordCloudReading(dayString)
        .subscribe(data => {
          if(data[0] == undefined || data[0] == null){this.noData = true; return;}
          this.noData = false;
          this.cloudData = data;
          this.activeTopic1 = true;
          this.activeTopic2 = true;
          this.activeTopic3 = true;
        });
      this.calculatePictogramPeople(this.activeTopic1, this.activeTopic2, this.activeTopic3);
    }
  }

  // routing to pie-chart
  gotoPieChart() {
    this.router.navigate(['/pie-chart'],
      { state: { day: this.day } });
  }

}
