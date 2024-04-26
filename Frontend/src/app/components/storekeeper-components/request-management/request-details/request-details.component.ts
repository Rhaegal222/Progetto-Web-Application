import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Request } from '../../../../models/request';
import { Product } from '../../../../models/product';
import { User } from '../../../../models/user';
import { RequestService } from '../../../../services/request.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: [
    './request-details.component.css',
    '../../../../styles/container.css',
    '../../../styles/content.css',
    '../../../styles/buttons.css',
    '../../../styles/form.css'
  ]

})

export class RequestDetailsComponent {

  constructor(private requestService: RequestService) {  }

  request: Request | undefined;
  selectedRequest: Request | undefined;

  idEmployeeRequest:number = 0;
  title:string = '';
  description:string = '';
  status:string = '';
  type:string = '';
  date:Date = new Date();
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
      this.idEmployeeRequest = this.request.idEmployeeRequest || 0;
      this.title = this.request.title;
      this.description = this.request.description;

      if (this.request.status) {
        switch (this.request.status) {
          case 'pending':
            this.status = 'In attesa';
            break;
          case 'accepted':
            this.status = 'Accettata';
            break;
          case 'rejected':
            this.status = 'Rifiutata';
            break;
          default:
            this.status = 'In attesa';
            break;
        }
      }

      this.type = this.request.type;
      this.date = this.request.date;
      if(typeof this.request.requestedItem === 'object')
        this.requestedItem = this.request.requestedItem;
      if (this.request.requestedItem) {
        if(typeof this.request.requestedItem === 'object'){
          this.idItem = this.request.requestedItem.idItem || 0;
          this.nameItem = this.request.requestedItem.name;
          this.typeItem = this.request.requestedItem.type;
          this.descriptionItem = this.request.requestedItem.description || '';
        }
      }
      if(typeof this.request.requestingUser === 'object'){
        this.requestingUser = this.request.requestingUser;
        if (this.request.requestingUser) {
          this.emailUser = this.request.requestingUser.email;
        }
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

  acceptRequest() {
    const request = this.request;
    request!.status = "accepted";
    if(request != undefined && request.idEmployeeRequest != undefined && request.idEmployeeRequest != null)
      this.requestService.acceptRequest(request.idEmployeeRequest);
    this.onClose();
  }

  rejectRequest() {
    const request = this.request;
    request!.status = "rejected";
    console.log(request);
    if(request != undefined && request.idEmployeeRequest != undefined && request.idEmployeeRequest != null)
      this.requestService.rejectRequest(request.idEmployeeRequest);
    this.onClose();
  }

}

export interface requestDetailsEventData {
  requestDetailsWindow: boolean;
}
