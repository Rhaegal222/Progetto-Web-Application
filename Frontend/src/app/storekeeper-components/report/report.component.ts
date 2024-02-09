import { Component } from '@angular/core';
import { ReportManagementservices } from '../../services/report.service'; 
import { Report } from '../../model/report';
@Component({
  selector: 'app-report-management',
  templateUrl: './report.component.html',
  styleUrls: [
    './report.component.css', 
    '../../styles/container.css',
    '../../styles/buttons.css'
  ]
})
export class ReportComponent {

  constructor(private reportService: ReportManagementservices) {}
  
  reportList: Report[] = [];

  ngOnInit(): void {
     this.getReports();
  }
  
  getReports(){
    this.reportService.getReports().subscribe({
      next: (data) => {
        this.reportList = data;
      },
      error: (error: any) => {
        console.log('There was an error!', error);
      }
    });
  }



}
