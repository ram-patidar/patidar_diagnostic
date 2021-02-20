import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddNewPatientComponent } from './modules/patient/add-new-patient/add-new-patient.component';
import { PatientListComponent } from './modules/patient/patient-list/patient-list.component';
import { ReportListComponent } from './modules/report/report-list/report-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'dashboard', component:DashboardComponent, pathMatch: 'full' },
  { path: 'patient', component:PatientListComponent, pathMatch: 'full' },
  // { path: 'add-patient', component:AddNewPatientComponent, pathMatch: 'full' },
  { path: 'report', component:ReportListComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
