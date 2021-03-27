import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { ReportServiceService } from 'src/app/services/report-service.service';
import { TestServiceService } from 'src/app/services/test-service.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss'],

})
export class EditReportComponent implements OnInit {
  repoid: any;
  finalAlldata = [];
  allparameter = [];
  patientData: any;
  nameShort: any;
  reportAlldata: any;
  authorised = false;
  testForm: FormGroup;
  todayDate = new Date();

  constructor(private route: ActivatedRoute, private reposervice: ReportServiceService, private patService: PatientServiceService, private testService: TestServiceService, private fb: FormBuilder, private toastservice: ToastService, private SpinnerService: NgxSpinnerService) {
    this.route.params.subscribe(
      params => {
        this.repoid = params.id;
      }
    )
  }

  ngOnInit(): void {
    this.getRepoData();
  }
  testSubmit() {
    //  this.authorised = this.testForm.controls['authorised'].value;
    let allData = [];
    let authData = [];
    // console.log(this.testForm.value);
    for (const property in this.testForm.value) {
      if (property != 'report_id') {
        if (property.split(',').length != 0) {
          let pa = property.split(',');
          let tid = pa[0];
          let pid = pa[1]
          if(tid == 'authorised') {
            let avalue = this.testForm.value[property];
            let authorised = { 'tid': pid, 'auth': avalue };
            authData.push(authorised);
          } else {
            let pvalue = this.testForm.value[property];

            let a = { testId: tid, pid: pid, value: pvalue };
            allData.push(a);
          }
        }
        // console.log(`${property}: ${this.testForm.value[property]}`);
      }
    }

    this.reposervice.updateReport(this.repoid, { parameter_data: JSON.stringify(allData), authorised: authData }).subscribe((data) => {
      this.toastservice.success('Report Updated Successfully!!')
      console.log(data);
      this.getRepoData();
    });
  }

  getRepoData() {
    this.SpinnerService.show();
    this.finalAlldata = [];
    this.allparameter = [];
    this.reposervice.getReportbyId(this.repoid).subscribe(data => {
      let repoData = data;
      this.reportAlldata = data;
      this.patService.getPatientbyid(repoData[0].patients_id).subscribe((data) => {
        this.patientData = data;
        if (this.patientData[0].first_name.split(" ").length > 1) {
          this.nameShort = this.patientData[0].first_name.split(" ")[0][0] + this.patientData[0].first_name.split(" ")[1][0];
        } else {
          this.nameShort = this.patientData[0].first_name[0];
        }
      })
      let stest = JSON.parse(repoData[0].test);
      let alltestData;
      let selectedtest = [];
      this.testService.getTest().subscribe(data => {
        alltestData = data;
        alltestData.forEach(atest => {
          stest.forEach(stestl => {
            if (atest.id == stestl.id) {
              selectedtest.push(atest);
            }
          });
        });

        let paramenter;
        this.reposervice.getParameter().subscribe(data => {
          paramenter = data;
          let parainnerdata = [];
          selectedtest.forEach(stest => {
            paramenter.forEach(para => {
              if (stest.id == para.test_id) {
                parainnerdata.push(para);
                this.allparameter.push(para);
              }
            });
            this.finalAlldata.push({ 'name': stest.test_name, 'id': stest.id, 'para': parainnerdata });
            parainnerdata = [];
          });
          this.createGroup();
          if (this.authorised) {
            // this.reposervice.generatePDF(this.reportAlldata[0], this.allparameter, this.patientData[0]);
          }
        })
      })
      this.SpinnerService.hide();
    })
  }

  createGroup() {
    let group = {};
    let auth = [];
    if (this.reportAlldata[0].authorised != null) {
      auth = JSON.parse(this.reportAlldata[0].authorised);
      auth.forEach(obj => {
        this.finalAlldata.forEach(fdata => {
          if (fdata.id == obj.tid) {
            group['authorised,' + obj.tid] = new FormControl(obj.auth);
          }
        });
      });

    } else {
      this.finalAlldata.forEach(fdata => {
        group['authorised,' + fdata.id] = new FormControl(false);
      });
    }

    group['report_id'] = new FormControl(this.repoid);
    let paradata = [];
    if (this.reportAlldata[0].parameter_data != null) {
      paradata = JSON.parse(this.reportAlldata[0].parameter_data);
    }

    this.allparameter.forEach(input_template => {
      if (paradata.length != 0) {
        paradata.forEach(element => {
          if (element.pid == input_template.id && element.testId == input_template.test_id) {
            group[input_template.test_id + ',' + input_template.id] = new FormControl(element.value);
          }

        });
      } else {
        group[input_template.test_id + ',' + input_template.id] = new FormControl('');
      }
    });
    this.testForm = new FormGroup(group);
  }
}
