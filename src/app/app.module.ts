import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { PictogramComponent } from './pages/pictogram/pictogram.component';
import { CommentComponent } from './pages/comment/comment.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { WordCloudComponent } from './pages/word-cloud/word-cloud.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    PictogramComponent,
    CommentComponent,
    PieChartComponent,
    WordCloudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
