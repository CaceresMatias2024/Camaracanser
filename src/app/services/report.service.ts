import { Injectable } from '@angular/core';

export interface Report {
  id: string;
  equipmentId: string;
  shortProblem: string;
  description: string;
  imageUrl: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reports: Report[] = [];
  
  constructor() {
    this.loadReports();
  }
  
  private loadReports(): void {
    const savedReports = localStorage.getItem('reports');
    if (savedReports) {
      this.reports = JSON.parse(savedReports).map((report: any) => {
        return {
          ...report,
          timestamp: new Date(report.timestamp)
        };
      });
    }
  }
  
  getReports(): Report[] {
    return [...this.reports];
  }
  
  getReportById(id: string): Report | undefined {
    return this.reports.find(report => report.id === id);
  }
  
  addReport(report: Omit<Report, 'id' | 'timestamp'>): Report {
    const newReport: Report = {
      id: Date.now().toString(),
      ...report,
      timestamp: new Date()
    };
    
    this.reports.unshift(newReport);
    this.saveReports();
    return newReport;
  }
  
  deleteReport(id: string): void {
    this.reports = this.reports.filter(report => report.id !== id);
    this.saveReports();
  }
  
  private saveReports(): void {
    localStorage.setItem('reports', JSON.stringify(this.reports));
  }
  
  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }
  
  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}