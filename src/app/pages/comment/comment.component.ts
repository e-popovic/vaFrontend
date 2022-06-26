import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AnalyticsService} from "../../services/analytics.service";
import {commentData} from "../../interfaces/commentData";
import {pictogramData} from "../../interfaces/pictogramData";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private router: Router, private commentService: AnalyticsService) { }
  comment = "Example Comment";
  day = 1 ;
  dayString = "";
  sentiment = "positive";

  sentimentImage = "assets/images/picto_positiv.png";
  activeSentiment = 0;
  currentComments = new Array<string>();
  index = 0;

  topic1 = "";
  topic2 = "";
  topic3 = "";
  noData = "";

  public commentInfo : commentData | undefined;
  public topicInfo : pictogramData[] | undefined;

  ngOnInit(): void {

    //reset variables
    this.index = 0;
    this.topic1 = "";
    this.topic2 = "";
    this.topic3 = "";
    this.noData = "";
    this.currentComments = new Array<string>();

    if (history.state.day) {
      this.day = history.state.day;
    }
    if(this.day < 10) {
      this.dayString = "0" + this.day
    } else {
      this.dayString = "" + this.day
    }
    if (history.state.sentiment == "positive") {
      this.sentiment = history.state.sentiment;
      this.sentimentImage = "assets/images/picto_positiv.png";
    } else if (history.state.sentiment == "negative") {
      this.sentiment = history.state.sentiment;
      this.sentimentImage = "assets/images/picto_negativ.png";
    }

    this.commentService.getPictogramReading(this.dayString)
      .subscribe(data => {
        if(data[0] == undefined){this.noData = "Sorry! There is no data available for this day."; return;}
        this.topicInfo = data;
        this.topic1 = data[0]["name"];
        this.topic2 = data[1]["name"];
        this.topic3 = data[2]["name"];
    });

    this.commentService.getCommentReading(this.dayString, this.sentiment)
      .subscribe(data => {
        this.commentInfo = data;

        for(let n = 0; n <= this.commentInfo["data"].length - 1; n++){
          this.currentComments.push(this.commentInfo["data"][n]["text"]);
        }

        //randomize the order of comments
        for (let i = this.currentComments.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.currentComments[i], this.currentComments[j]] = [this.currentComments[j], this.currentComments[i]];
        }

        //set the current displayed comment
        this.comment = this.currentComments[0];
    });
  }

  chooseSentiment(sentiment: number) {
    this.activeSentiment = sentiment;
    switch(sentiment) {
      case 0:
        history.state.sentiment = "positive";
        break;
      case 1:
        history.state.sentiment = "negative";
        break;
    }
    this.ngOnInit();
  }

  changeDate(direction: number) {
    if (direction && this.day < 31){
      this.day++;
    }
    else if (!direction && this.day > 1){
      this.day--;
    }
    history.state.day = this.day;
    this.ngOnInit();
  }

  getNextComment() {
    this.index = this.index + 1;
    if(this.index >= this.currentComments.length) {
      this.index = 0;
    }
    this.comment = this.currentComments[this.index];
  }

  getPrevComment() {
    this.index--;
    if(this.index <= 0) {
      this.index = this.currentComments.length - 1;
    }
    this.comment = this.currentComments[this.index];
  }

  gotoPictogram() {
    this.router.navigate(['/pictogram'],
      { state: { day: this.day } });
  }
}
