import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart-tools',
  templateUrl: './chart-tools.component.html',
  styleUrls: [
    './chart-tools.component.css',
    '../../../../styles/buttons.css',
  ]
})
export class ChartToolsComponent {

  isActive : boolean = true;

  element : string = 'Mese';

  key : string = 'month';

  elements = [
    {key: 'day', name: 'Giorno', visible: true},
    {key: 'month', name: 'Mese', visible: false},
    {key: 'year', name: 'Anno', visible: true},
  ];

  @Output() chartChangedEvent = new EventEmitter<chartChangedEventData>();

  changeChart() {
    this.isActive = !this.isActive;
    const eventData: chartChangedEventData = {
      chartChanged: this.isActive,
    }
    this.chartChangedEvent.emit(eventData);
  }

  setElement(element: string){
    this.element = element;
    this.elements.forEach(element => {
      element.visible = true;
    });
    const elementItem = this.elements.find(element => element.name === this.element);
    if (elementItem) {
      elementItem.visible = false;
    }
    this.key = this.elements.find(element => element.name === this.element)?.key || '';
  }
}

export interface chartChangedEventData {
  chartChanged: boolean;
}
