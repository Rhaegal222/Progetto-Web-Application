import { Component } from '@angular/core';
import { ReportManagementservices } from '../../services/report.service'; 
import { Report } from '../../model/report';
import { ErrorService } from '../../services/error.service';
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

  constructor(
    private reportService: ReportManagementservices,
    private errorService: ErrorService) {}
  
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
        this.errorService.handleError(error);
      }
    });
  }



}
