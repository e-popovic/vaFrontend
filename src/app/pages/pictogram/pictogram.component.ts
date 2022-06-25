import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AnalyticsService} from "../../services/analytics.service";
import {pictogramData} from "../../interfaces/pictogramData";

@Component({
  selector: 'app-pictogram',
  templateUrl: './pictogram.component.html',
  styleUrls: ['./pictogram.component.css']
})
export class PictogramComponent implements OnInit {

  constructor(private router: Router, private pictogramService: AnalyticsService) { }
  
  public pictoInfo : pictogramData[] | undefined;

  day = 7;
  dayString = "";
  noData = "Sorry! There is no data avalable for this day.";
  
  activeTopic1 = true;
  activeTopic2 = true;
  activeTopic3 = true;

  topic1 = "";
  topic2 = "";
  topic3 = "";

  positivComments = new Array<string>();
  negativComments = new Array<string>();

  nr_positiv = 0;
  nr_negativ = 0;
  nr_total = 0;

  ngOnInit(): void {
    //reset elements, because init function is called when changing days
    this.positivComments = new Array<string>();
    this.negativComments = new Array<string>();
    this.topic1 = "";
    this.topic2 = "";
    this.topic3 = "";
    this.activeTopic1 = true;
    this.activeTopic2 = true;
    this.activeTopic3 = true;
    this.noData = "Sorry! There is no data avalable for this day.";

    if (history.state.day) {
      this.day = history.state.day;
    }

    if(this.day < 10) {
      this.dayString = "0" + this.day
    } else {
      this.dayString = "" + this.day
    }

    this.pictogramService.getPictogramReading(this.dayString)
      .subscribe(data => {
        this.pictoInfo = data;
        this.nr_positiv = data[0]["positive_comments"] + data[1]["positive_comments"] + data[2]["positive_comments"];
        this.nr_negativ = data[0]["negative_comments"] + data[1]["negative_comments"] + data[2]["negative_comments"];
        this.nr_total = data[0]["all_comments"] + data[1]["all_comments"] + data[2]["all_comments"];
        this.topic1 = data[0]["name"];
        this.topic2 = data[1]["name"];
        this.topic3 = data[2]["name"];

        //Get the percentage of positive and negative comments so that there are always 100 people on the screen
        this.nr_positiv = Math.round((this.nr_positiv * 100) / this.nr_total);
        this.nr_negativ = Math.round((this.nr_negativ * 100) / this.nr_total);
        
        for(let n = 1; n <= this.nr_positiv; n++){
          this.positivComments.push("Good feeling " + n);
        }
  
        for(let n = 1; n <= this.nr_negativ; n++){
          this.negativComments.push("Bad feeling " + n);
        }
        if(this.topic1 != ""){this.noData = ""};
      });
  }

  chooseData(topic: number) { 
    if(this.pictoInfo == undefined){return;}
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
    
    /*At least one topic must be selected */
    if((this.activeTopic1 || this.activeTopic2 || this.activeTopic3) == false) {
      this.chooseData(topic);
    }

    this.positivComments = new Array<string>();
    for(let n = 1; n <= this.nr_positiv; n++){
      this.positivComments.push("Good feeling " + n);
    }

    this.negativComments = new Array<string>();
    for(let n = 1; n <= this.nr_negativ; n++){
      this.negativComments.push("Bad feeling " + n);
    }
  }

  calculatePictogramPeople(t1: boolean, t2:boolean, t3:boolean) {
    if(this.pictoInfo == undefined){return;}
    console.log(t1, t2, t3);
    if(t1 && t2 && t3) {
      console.log("all topics");
      this.nr_positiv = this.pictoInfo[0]["positive_comments"] + this.pictoInfo[1]["positive_comments"] + this.pictoInfo[2]["positive_comments"];
      this.nr_negativ = this.pictoInfo[0]["negative_comments"] + this.pictoInfo[1]["negative_comments"] + this.pictoInfo[2]["negative_comments"];
      this.nr_total = this.pictoInfo[0]["all_comments"] + this.pictoInfo[1]["all_comments"] + this.pictoInfo[2]["all_comments"];
    } else if (t1 && t2) {
      console.log("t1 && t2");
      this.nr_positiv = this.pictoInfo[0]["positive_comments"] + this.pictoInfo[1]["positive_comments"];
      this.nr_negativ = this.pictoInfo[0]["negative_comments"] + this.pictoInfo[1]["negative_comments"];
      this.nr_total = this.pictoInfo[0]["all_comments"] + this.pictoInfo[1]["all_comments"];
    } else if (t1 && t3) {
      console.log("t1 && t3");
      this.nr_positiv = this.pictoInfo[0]["positive_comments"] + this.pictoInfo[2]["positive_comments"];
      this.nr_negativ = this.pictoInfo[0]["negative_comments"] + this.pictoInfo[2]["negative_comments"];
      this.nr_total = this.pictoInfo[0]["all_comments"] + this.pictoInfo[2]["all_comments"];
    } else if (t2 && t3) {
      console.log("t2 && t3");
      this.nr_positiv = this.pictoInfo[1]["positive_comments"] + this.pictoInfo[2]["positive_comments"];
      this.nr_negativ = this.pictoInfo[1]["negative_comments"] + this.pictoInfo[2]["negative_comments"];
      this.nr_total = this.pictoInfo[1]["all_comments"] + this.pictoInfo[2]["all_comments"];
    } else if (t1) {
      console.log("t1");
      this.nr_positiv = this.pictoInfo[0]["positive_comments"]
      this.nr_negativ = this.pictoInfo[0]["negative_comments"];
      this.nr_total = this.pictoInfo[0]["all_comments"];
    } else if (t2) {
      console.log("t2");
      this.nr_positiv = this.pictoInfo[1]["positive_comments"]
      this.nr_negativ = this.pictoInfo[1]["negative_comments"];
      this.nr_total = this.pictoInfo[1]["all_comments"];
    } else if (t3) {
      console.log("t3");
      this.nr_positiv = this.pictoInfo[2]["positive_comments"]
      this.nr_negativ = this.pictoInfo[2]["negative_comments"];
      this.nr_total = this.pictoInfo[2]["all_comments"];
    }
    this.nr_positiv = Math.round((this.nr_positiv * 100) / this.nr_total);
    this.nr_negativ = Math.round((this.nr_negativ * 100) / this.nr_total);
  }

  gotoPositivComment(index: number) {
    
    //Routing needs be changed, only the day and the sentiment of the clicked person are relevant
    this.router.navigate(['/comment'],
      { state: { day: this.day, commentIndex: index, sentiment: "positiv", positiv: this.positivComments, negativ: this.negativComments } });  
  }

  gotoNegativComment(index: number) {

    //Routing needs be changed, only the day and the sentiment of the clicked person are relevant
    this.router.navigate(['/comment'],
    { state: { day: this.day, commentIndex: index, sentiment: "negativ", positiv: this.positivComments, negativ: this.negativComments } });  
}

  changeDate(direction: number) {
    if (direction && this.day < 31){
      this.day++;
    }
    else if (!direction && this.day > 1){
      this.day--;
    }
    if (history.state.day) {
      history.state.day = this.day;
    }
    this.ngOnInit();
  }
}
