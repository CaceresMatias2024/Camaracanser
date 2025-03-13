import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReportService, Report } from '../services/report.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ReportDetailComponent implements OnInit {
  report: Report | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.report = this.reportService.getReportById(id);
      if (!this.report) {
        this.router.navigate(['/reports']);
      }
    } else {
      this.router.navigate(['/reports']);
    }
  }
  
  goBack(): void {
    this.router.navigate(['/reports']);
  }
  
  formatDate(date: Date): string {
    return this.reportService.formatDate(date);
  }
  
  formatTime(date: Date): string {
    return this.reportService.formatTime(date);
  }
}