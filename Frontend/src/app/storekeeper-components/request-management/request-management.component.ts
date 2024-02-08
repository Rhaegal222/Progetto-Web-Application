import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { Request } from '../../model/request';
import { request } from 'http';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: [ './request-management.component.css',
    '../../styles/grid.css',
    '../../styles/list.css',
    '../../styles/buttons.css'
  ]
})
export class RequestManagementComponent {

  constructor(private requestService: RequestService) { }

  requests: Request[] = [];
  length: number = 0;

  ngOnInit(): void {
    this.initObservable();
  }

  // create an observable that emits the length of the products list
  initObservable(){
    const observable = new Observable((observer) => {
      observer.next(this.requests.length);
    });

    // Iscriversi all'observable
    observable.subscribe((length: unknown) => {
      if (typeof length === 'number') {
        const anyLength: any = length;
        // Ora è possibile utilizzare anyLength come valore di tipo any
        this.length = anyLength;
      }
    });
  }

  onSearch(eventData: MyEventData) {
    // Se la barra di ricerca è vuota e la categoria è "Tutte le categorie", chiamare getAllProducts.
    // Altrimenti, chiamare getProducts con i valori correnti di searchValue e category.
    console.log(eventData);
    if (eventData.searchValue === "" && eventData.category === "all") {
      this.getAllRequests();
    } else {
      this.requestService.getRequests(eventData.searchValue, eventData.category).subscribe({
        next: (data) => {
          this.requests = data;
          console.log(this.requests);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  getAllRequests(){
    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        console.log(this.requests);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  // accetta la richista
  acceptRequest(request: Request) {
    request.status = "accepted";
    this.requestService.editRequest(request.idRequest, request.status).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // rifiuta la richiesta
  rejectRequest(request: Request) {
    request.status = "rejected";
    this.requestService.editRequest(request.idRequest, request.status).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

export interface MyEventData {
  searchValue: string;
  category: string;
}
