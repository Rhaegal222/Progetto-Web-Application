import { Component } from '@angular/core';

var box : any;
var boxItem : any;
var boxItemBody : any;
var boxItemImg : any;
var boxItemFooter : any;
var boxItemButtons : any;

@Component({
  selector: 'app-tools-bar',
  templateUrl: './tools-bar.component.html',
  styleUrls: [
    './tools-bar.component.css',
    '../../styles/buttons.css',
  ]
})

export class ToolsBarComponent {
  constructor() { }

  isActive : boolean = true;

  changeView() {
    this.isActive = !this.isActive;

    box = document.getElementById('box');
    
    if (box == null) return;

    console.log(box);

    if(this.isActive) {
      box.classList.toggle('list', false);
      box.classList.toggle('grid', true);
    }
    else {
      box.classList.toggle('list', true);
      box.classList.toggle('grid', false);
    }

  }

}
