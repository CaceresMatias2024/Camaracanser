import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ReportFormComponent {
  equipmentId: string = '';
  shortProblem: string = '';
  description: string = '';
  currentImageUrl: string = '';
  
  constructor(
    private reportService: ReportService,
    private router: Router
  ) {}
  
  captureImage(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.capture = 'environment';
    
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.currentImageUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    
    fileInput.click();
  }
  
  saveReport(): void {
    if (!this.equipmentId || !this.shortProblem || !this.description || !this.currentImageUrl) {
      alert('Por favor, complete todos los campos y tome una foto');
      return;
    }
    
    this.reportService.addReport({
      equipmentId: this.equipmentId,
      shortProblem: this.shortProblem,
      description: this.description,
      imageUrl: this.currentImageUrl
    });
    
    this.router.navigate(['/reports']);
  }
}