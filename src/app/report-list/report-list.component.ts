import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportService, Report } from '../services/report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];
  
  constructor(private reportService: ReportService) {}
  
  ngOnInit(): void {
    this.loadReports();
  }
  
  loadReports(): void {
    this.reports = this.reportService.getReports();
  }
  
  deleteReport(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar este reporte?')) {
      this.reportService.deleteReport(id);
      this.loadReports();
    }
  }
  
  formatDate(date: Date): string {
    return this.reportService.formatDate(date);
  }
  
  formatTime(date: Date): string {
    return this.reportService.formatTime(date);
  }
}