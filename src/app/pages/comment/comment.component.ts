import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comment = "";
  day = 21;
  constructor() { }

  ngOnInit(): void {
    if (history.state.day) {
      this.day = history.state.day;
    }
    if (history.state.comment) {
      this.comment = history.state.comment;
    }
  }
}
