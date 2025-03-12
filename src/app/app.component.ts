import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Report {
  id: string;
  equipmentId: string;
  shortProblem: string;
  description: string;
  imageUrl: string;
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
  title = 'Sistema de Reportes de Problemas';
  
  equipmentId: string = '';
  shortProblem: string = '';
  description: string = '';
  currentImageUrl: string = ''; // Almacena temporalmente la imagen tomada
  reports: Report[] = [];
  selectedReport: Report | null = null;
  showDetails: boolean = false;
  
  ngOnInit(): void {
    // Cargar reportes del localStorage si existen
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
          // Solo guarda la imagen en la variable temporal
          this.currentImageUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    
    fileInput.click();
  }
  
  saveReport(): void {
    // Validar que todos los campos estén completos
    if (!this.equipmentId || !this.shortProblem || !this.description || !this.currentImageUrl) {
      alert('Por favor, complete todos los campos y tome una foto');
      return;
    }
    
    const newReport: Report = {
      id: Date.now().toString(),
      equipmentId: this.equipmentId,
      shortProblem: this.shortProblem,
      description: this.description,
      imageUrl: this.currentImageUrl,
      timestamp: new Date()
    };
    
    this.reports.unshift(newReport);
    this.saveReports();
    
    // Limpiar formulario
    this.equipmentId = '';
    this.shortProblem = '';
    this.description = '';
    this.currentImageUrl = '';
  }
  
  deleteReport(id: string): void {
    this.reports = this.reports.filter(report => report.id !== id);
    this.saveReports();
    
    if (this.selectedReport && this.selectedReport.id === id) {
      this.selectedReport = null;
      this.showDetails = false;
    }
  }
  
  viewDetails(report: Report): void {
    this.selectedReport = report;
    this.showDetails = true;
  }
  
  closeDetails(): void {
    this.showDetails = false;
  }
  
  saveReports(): void {
    localStorage.setItem('reports', JSON.stringify(this.reports));
  }
  
  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }
  
  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}