import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comment = "Example Comment";
  day = 1;
  sentimentImage = "assets/images/picto_positiv.png";
  activeSentiment = 0;
  positivComments = new Array<string>();
  negativComments = new Array<string>();
  currentComments = new Array<string>();
  index = 0;

  constructor() { }

  ngOnInit(): void {
    if (history.state.day) {
      this.day = history.state.day;
    }
    if (history.state.commentIndex) {
      this.index = history.state.commentIndex;
    }
    if (history.state.positiv) {
      this.positivComments = history.state.positiv;
    }
    if (history.state.negativ) {
      this.negativComments = history.state.negativ;
    }
    if (history.state.sentiment == "positiv") {
      
      this.activeSentiment = 0;
      this.sentimentImage = "assets/images/picto_positiv.png";
      this.comment = this.positivComments[this.index];
      this.currentComments = this.positivComments;

    } else if (history.state.sentiment == "negativ") {
      
      this.activeSentiment = 1;
      this.sentimentImage = "assets/images/picto_negativ.png";
      this.comment = this.negativComments[this.index];
      this.currentComments = this.negativComments;
    }
  }

  chooseSentiment(sentiment: number) {
    this.activeSentiment = sentiment;
    switch(sentiment) {
      case 0:
        this.sentimentImage = "assets/images/picto_positiv.png";
        this.currentComments = this.positivComments;
        break;
      case 1:
        this.sentimentImage = "assets/images/picto_negativ.png";
        this.currentComments = this.negativComments;
        break;
    }
    this.index = 0;
    this.comment = this.currentComments[this.index];
  }

  changeDate(direction: number) {
    if (direction && this.day < 31){
      this.day++;
    }
    else if (!direction && this.day > 1){
      this.day--;
    }
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
}
