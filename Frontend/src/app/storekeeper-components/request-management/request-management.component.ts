import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { Request } from '../../model/request';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: [ 
    './request-management.component.css',
    '../../styles/grid.css',
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
    console.log(eventData);
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
    console.log(this.requestProduct);
    this.returnedRequests = this.requests.filter(request => request.type === "returnRequest");
    console.log(this.returnedRequests);
  }

  // accetta la richista
  acceptRequest(request: Request) {
    request.status = "accepted";
    this.requestService.acceptRequest(request.idEmployeeRequest);
  }

  // rifiuta la richiesta
  rejectRequest(request: Request) {
    request.status = "rejected";
    this.requestService.rejectRequest(request.idEmployeeRequest);
  }
}

export interface onSearchEventData {
  searchValue: string;
  element: string;
}