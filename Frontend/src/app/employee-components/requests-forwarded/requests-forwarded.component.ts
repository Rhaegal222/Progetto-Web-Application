import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { Request } from '../../model/request';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-requests-forwarded',
  templateUrl: './requests-forwarded.component.html',
  styleUrls: [
    './requests-forwarded.component.css',
    '../../styles/grid.css',
    '../../styles/list.css',
    '../../styles/buttons.css'
  ]
})

export class RequestsForwardedComponent {

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
    this.searchValue = eventData.searchValue;
    this.status = eventData.element;
    if (this.searchValue === "" && this.status === "all") {
      this.getAllRequests();
    } else {
      this.requestService.getRequests(this.searchValue, this.status).subscribe({
        next: (data) => {
          this.requests = data;
        },
        error: (error: any) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  getAllRequests() {
    this.requestService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.filterRequests();
      },
      error: (error: any) => {
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
  
  /*
  OnOpenRequestDetails(request: Request) {
    this.selectedRequest = request;
  }

  OnCloseRequestDetails() {
    this.selectedRequest = undefined;
  }
  */
}

interface onSearchEventData {
  searchValue: string;
  element: string;
}
