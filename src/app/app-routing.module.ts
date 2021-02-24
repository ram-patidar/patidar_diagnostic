import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PatientListComponent } from './modules/patient/patient-list/patient-list.component';
import { ReportListComponent } from './modules/report/report-list/report-list.component';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { BillingComponent } from './modules/patient/billing/billing.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'dashboard', component:DashboardComponent, canActivate: [AuthserviceService], pathMatch: 'full' },
  { path: 'patient', component:PatientListComponent,  canActivate: [AuthserviceService], pathMatch: 'full' },
  { path: 'billing', component:BillingComponent, pathMatch: 'full' },
  { path: 'report', component:ReportListComponent, canActivate: [AuthserviceService], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
