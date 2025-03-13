import { Routes } from '@angular/router';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', component: ReportFormComponent },
  { path: 'reports', component: ReportListComponent },
  { path: 'report/:id', component: ReportDetailComponent },
  { path: '**', redirectTo: 'form' }
];