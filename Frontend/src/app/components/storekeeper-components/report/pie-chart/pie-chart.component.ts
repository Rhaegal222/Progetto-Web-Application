import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { RequestService } from '../../../../services/request.service';
import { Request } from '../../../../models/request';
import { ErrorService } from '../../../../services/error.service';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {

  public chart: any;

  requests: Request[] = [];
  returnedRequests: Request[] = [];
  requestProduct: Request[] = [];

  requestProductLength: string = '0';
  returnedRequestsLength: string = '0';

  length: number = 0;

  constructor(private requestService: RequestService, private errorService:ErrorService) { }

  ngOnInit() {
    this.getAllRequests();
  }

  createChart(){
    this.chart = new Chart("pie-chart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [
          'Richieste di reso',
          'Richieste di prodotto'
        ],
	      datasets: [{
          data: [
            this.returnedRequestsLength,
            this.requestProductLength
          ],
          backgroundColor: [
            'red',
            'grey',
          ],
          hoverOffset: 4
        }]
      },
    });
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
    this.requestProductLength = this.requestProduct.length.toString();
    this.returnedRequests = this.requests.filter(request => request.type === "returnRequest");
    this.returnedRequestsLength = this.returnedRequests.length.toString();
    this.createChart();
  }
}
