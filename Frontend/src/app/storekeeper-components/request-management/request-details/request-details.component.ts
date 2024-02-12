import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Request } from '../../../model/request';
import { Product } from '../../../model/product';
import { User } from '../../../model/user';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: [
    './request-details.component.css',
    '../../../styles/container.css',
    '../../../styles/content.css',
    '../../../styles/buttons.css',
    '../../../styles/form.css'
  ]

})

export class RequestDetailsComponent {

  constructor() { }

  request: Request | undefined;
  selectedRequest: Request | undefined;

  idEmployeeRequest:number = 0;
  title:string = '';
  description:string = '';
  status:string = '';
  type:string = '';
  date:string = '';
  requestedItem:Product | undefined;
  idItem:number = 0;
  nameItem:string = '';
  typeItem:string = '';
  descriptionItem:string = '';
  requestingUser:User | undefined;
  emailUser:string = '';

  ngOnInit(): void {
    this.getAllDetails();
    console.log(this.request);
  }

  ngAfterViewInit() {
    this.getAllDetails();
    console.log(this.request);
  }

  getAllDetails(){
    const selectedRequest = localStorage.getItem('selectedRequest');
    if (selectedRequest !== null && selectedRequest !== undefined) {
      this.selectedRequest = JSON.parse(selectedRequest);

      if(this.selectedRequest != null && this.selectedRequest != undefined){
        this.request = this.selectedRequest;
      }
    }
    if (this.request) {
      this.idEmployeeRequest = this.request.idEmployeeRequest;
      this.title = this.request.title;
      this.description = this.request.description;
      this.status = this.request.status;
      this.type = this.request.type;
      this.date = this.request.date;
      this.requestedItem = this.request.requestedItem;
      if (this.request.requestedItem) {
        this.idItem = this.request.requestedItem.idItem || 0;
        this.nameItem = this.request.requestedItem.name;
        this.typeItem = this.request.requestedItem.type;
        this.descriptionItem = this.request.requestedItem.description || '';
      }
      this.requestingUser = this.request.requestingUser;
      if (this.request.requestingUser) {
        this.emailUser = this.request.requestingUser.email;
      }
    }
  }

  @Output() closeEvent = new EventEmitter<requestDetailsEventData>();
  onClose(){
    localStorage.removeItem('selectedRequest');
    const eventData: requestDetailsEventData = {
      requestDetailsWindow: false,
    };
    this.closeEvent.emit(eventData);
  }

  onSave(){
    this.onClose();
  }

  /*
  acceptRequest(request: Request) {
    request.status = "accepted";
    this.requestService.acceptRequest(request.idEmployeeRequest);
  }

  // rifiuta la richiesta
  rejectRequest(request: Request) {
    request.status = "rejected";
    this.requestService.rejectRequest(request.idEmployeeRequest);
  }

  <button *ngIf="request.status == 'pending'" (click)="acceptRequest(request)" class="btn btn-success">Accetta</button>
  <button *ngIf="request.status == 'pending'" (click)="rejectRequest(request)" class="btn btn-danger">Rifiuta</button>
  */

}

export interface requestDetailsEventData {
  requestDetailsWindow: boolean;
}
