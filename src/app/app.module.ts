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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditReportComponent } from './modules/report/edit-report/edit-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
    BillingComponent,
    RegisterComponent,
    EditReportComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
