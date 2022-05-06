import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {CommentComponent} from "./pages/comment/comment.component";
import {PictogramComponent} from "./pages/pictogram/pictogram.component";
import {PieChartComponent} from "./pages/pie-chart/pie-chart.component";
import {WordCloudComponent} from "./pages/word-cloud/word-cloud.component";

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'pictogram', component: PictogramComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'word-cloud', component: WordCloudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
