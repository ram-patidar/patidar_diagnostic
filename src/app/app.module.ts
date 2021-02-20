import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardBodyComponent } from './modules/dashboard-body/dashboard-body.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PatientListComponent } from './modules/patient/patient-list/patient-list.component';
import { AddNewPatientComponent } from './modules/patient/add-new-patient/add-new-patient.component';
import { EditPatientComponent } from './modules/patient/edit-patient/edit-patient.component';
import { ReportListComponent } from './modules/report/report-list/report-list.component';
import { BillingComponent } from './modules/patient/billing/billing.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardBodyComponent,
    SidebarComponent,
    PatientListComponent,
    AddNewPatientComponent,
    EditPatientComponent,
    ReportListComponent,
    BillingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
