import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pictogram',
  templateUrl: './pictogram.component.html',
  styleUrls: ['./pictogram.component.css']
})
export class PictogramComponent implements OnInit {
  day = 21;
  
  activeTopic1 = true;
  activeTopic2 = true;
  activeTopic3 = true;

  positivComments = new Array<string>();
  negativComments = new Array<string>();

  nr_positiv = 65;
  nr_negativ = 35;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (history.state.day) {
      this.day = history.state.day;
    }

    for(let n = 1; n <= 65; n++){
      this.positivComments.push("Good feeling " + n);
    }

    for(let n = 1; n <= 35; n++){
      this.negativComments.push("Bad feeling " + n);
    }
  }

  chooseData(topic: number) { 
    switch(topic) {
      case 0:
        this.activeTopic1 = !this.activeTopic1;
        if(this.activeTopic1 == true ) {
          this.nr_positiv += 17
          this.nr_negativ += 9
        } else {
          this.nr_positiv -= 17
          this.nr_negativ -= 9
        }
        break;
      case 1:
        this.activeTopic2 = !this.activeTopic2;
        if(this.activeTopic2 == true ) {
          this.nr_positiv += 25
          this.nr_negativ += 15
        } else {
          this.nr_positiv -= 25
          this.nr_negativ -= 15
        }
        break;
      case 2:
        this.activeTopic3 = !this.activeTopic3;
        if(this.activeTopic3 == true ) {
          this.nr_positiv += 23
          this.nr_negativ += 11
        } else {
          this.nr_positiv -= 23
          this.nr_negativ -= 11
        }
        break;
    }
    
    /*At least one topic must be selected */
    if(!(this.activeTopic1 || this.activeTopic2 || this.activeTopic3) == true) {
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

  gotoPositivComment(index: number) {
    console.log(index);  
    this.router.navigate(['/comment'],
      { state: { day: this.day, commentIndex: index, sentiment: "positiv", positiv: this.positivComments, negativ: this.negativComments } });  
  }

  gotoNegativComment(index: number) {
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
  }
}
