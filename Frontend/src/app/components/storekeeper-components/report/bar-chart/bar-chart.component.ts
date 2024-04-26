import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { RequestService } from '../../../../services/request.service';
import { Request } from '../../../../models/request';
import { ErrorService } from '../../../../services/error.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

  public chart: any;

  ngOnInit() {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("bar-chart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
	       datasets: [
          {
            label: "Richieste di reso",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'red'
          },
          {
            label: "Richieste di prodotto",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'grey'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }
}
