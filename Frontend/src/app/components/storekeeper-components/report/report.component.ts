import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: [
    './report.component.css',
    '../../styles/container.css',
    '../../styles/content.css',
  ]
})
export class ReportComponent {

  isShowing : boolean = true;

  changeChart(eventData: chartChangedEventData) {
    this.isShowing = eventData.chartChanged;
  }

}

export interface chartChangedEventData {
  chartChanged: boolean;
}
