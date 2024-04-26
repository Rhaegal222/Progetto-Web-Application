import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../../services/request.service';
import { Request } from '../../../models/request';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: [
    './request-management.component.css',
    '../../../styles/grid.css',
    '../../styles/list.css',
    '../../styles/buttons.css'
  ]
})

export class RequestManagementComponent {

  constructor(private requestService: RequestService, private errorService: ErrorService) { }

  requests: Request[] = [];
  returnedRequests: Request[] = [];
  requestProduct: Request[] = [];

  length: number = 0;

  isShowingDetails: boolean = false;

  ngOnInit(): void {
    this.initObservable();
    this.getAllRequests();
  }

  initObservable(){
    const observable = new Observable((observer) => {
      observer.next(this.requests.length);
    });

    observable.subscribe((length: unknown) => {
      if (typeof length === 'number') {
        const anyLength: any = length;
        this.length = anyLength;
      }
    });
  }

  searchValue: string = '';
  status: string = 'all';

  onSearch(eventData: onSearchEventData) {
    if (eventData.searchValue === "" && eventData.element === "all") {
      this.getAllRequests();
    } else {
      this.requestService.getRequests(eventData.searchValue, eventData.element).subscribe({
        next: (data) => {
          this.requests = data;
          this.filterRequests();
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  getAllRequests(){
    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.filterRequests();
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }

  filterRequests(){
    // filtra le richieste in base allo stato e le aggiunge alle liste corrispondenti
    this.requestProduct = this.requests.filter(request => request.type === "requestProduct");
    this.returnedRequests = this.requests.filter(request => request.type === "returnRequest");
  }

  @Output() onShowDetailsEvent = new EventEmitter<Request>();

  openDetails(request: Request) {
    this.isShowingDetails = true;
    localStorage.setItem('selectedRequest', JSON.stringify(request));
  }

  onClose(eventData: requestDetailsEventData) {
    this.isShowingDetails = eventData.requestDetailsWindow;
  }

  acceptRequest(request: Request) {
    if (request.idEmployeeRequest !== undefined) {
      this.requestService.acceptRequest(request.idEmployeeRequest);
      window.location.reload();
    }
  }
  rejectRequest(request: Request) {
    if (request.idEmployeeRequest !== undefined) {
      this.requestService.rejectRequest(request.idEmployeeRequest);
      window.location.reload();
    }
  }
}

export interface onSearchEventData {
  searchValue: string;
  element: string;
}

export interface requestDetailsEventData {
  requestDetailsWindow: boolean;
}
