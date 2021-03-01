import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PatientListComponent } from './modules/patient/patient-list/patient-list.component';
import { ReportListComponent } from './modules/report/report-list/report-list.component';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { BillingComponent } from './modules/patient/billing/billing.component';
import { EditReportComponent } from './modules/report/edit-report/edit-report.component';
import { ProfileComponent } from './modules/admin/profile/profile.component';
import { DoctorComponent } from './modules/admin/doctor/doctor.component';
import { TestComponent } from './modules/admin/test/test.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'dashboard', component:DashboardComponent, canActivate: [AuthserviceService], pathMatch: 'full' },
  { path: 'patient', component:PatientListComponent,  canActivate: [AuthserviceService], pathMatch: 'full' },
  { path: 'billing', component:BillingComponent, canActivate: [AuthserviceService], pathMatch: 'full' },
  { path: 'report', component:ReportListComponent, canActivate: [AuthserviceService], pathMatch: 'full' },
  { path: 'edit-report', component:EditReportComponent, canActivate: [AuthserviceService], pathMatch: 'full' },
  { path: 'profile', component:ProfileComponent, canActivate: [AuthserviceService], pathMatch: 'full' },
  { path: 'doctor', component:DoctorComponent, canActivate: [AuthserviceService], pathMatch: 'full' },
  { path: 'test', component:TestComponent, canActivate: [AuthserviceService], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
