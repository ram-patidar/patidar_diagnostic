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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './modules/admin/profile/profile.component';
import { DoctorComponent } from './modules/admin/doctor/doctor.component';
import { TestComponent } from './modules/admin/test/test.component';
import { EditProfileComponent } from './modules/admin/edit-profile/edit-profile.component';
import { EditDoctorComponent } from './modules/admin/edit-doctor/edit-doctor.component';
import { AddNewDoctorComponent } from './modules/admin/add-new-doctor/add-new-doctor.component';
import { AddNewTestComponent } from './modules/admin/add-new-test/add-new-test.component';
import { EditTestComponent } from './modules/admin/edit-test/edit-test.component';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { TooltipModule } from 'ng2-tooltip-directive';
import { BillingModalComponent } from './modules/patient/billing-modal/billing-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ɵROUTER_PROVIDERS } from '@angular/router';
import { PrintReportComponent } from './modules/report/print-report/print-report.component';
import { UprofileComponent } from './modules/uprofile/uprofile/uprofile.component';

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
    ProfileComponent,
    DoctorComponent,
    TestComponent,
    EditProfileComponent,
    EditDoctorComponent,
    AddNewDoctorComponent,
    AddNewTestComponent,
    EditTestComponent,
    BillingModalComponent,
    PrintReportComponent,
    UprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    AngularToastifyModule,
    TooltipModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  
  providers: [DatePipe],
  bootstrap: [AppComponent ]
})
export class AppModule { }
