import { Component, ViewChild, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { fromEvent, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { ReportServiceService } from 'src/app/services/report-service.service';
import { TestServiceService } from 'src/app/services/test-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  public dataall: any;
  @ViewChild('search', { static: false }) search: any;
  @ViewChild('testForm') testform: NgForm;
  @Output() onToggleBilling = new EventEmitter<boolean>();
  onToggle(addBilling: boolean){
    this.display = false;
   }
  public temp: any;
  public selected = [];
  public testdata:any;
  public editData = [];
  uniqueNames = [];
  display = false;
test = [];
  parameterData: any;
  patientData: any;
  allreportData: any;
  loopData: any;
  repoid:any;
  patid:any;
  reportList = [];
  public count = 100;
  public pageSize = 1;
  public limit = 5;
  public offset = 0;
  public rowdata = [];
  billingData = [];
  loadingIndicator = true;
  columns = [{ name: 'Name', prop: 'pname', width: 100 }, { name: 'Patient Id', prop: 'pid', width: 100 }, { name: 'Doctor', prop: 'doctor', width: 100 }];

  data: any;
  myOptions = {
    'show-delay': 300,
  }
  constructor(private reportService: ReportServiceService, private patientservice: PatientServiceService, private router: Router, private _toastService: ToastService, private testservice:TestServiceService) {
   }



  ngOnInit(): void {
   
   

 
    this.reportList = [];
    this.get_data();
  }

  onActivate(event: any) {
    //console.log('Activate Event', event);
  }

  public changeLimit(event: any): void {
    this.limit = parseInt(event.target.value);
  }

  public onPage(event: any): void {
    this.count = event.count;
    this.pageSize = event.pageSize;
    this.limit = event.limit;
    this.offset = event.offset;
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keydown').pipe(
      debounceTime(100),
      map(x => x['target']['value'])
    ).subscribe(value => {
      this.updateFilter(value);
    });
  }

  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable

    this.dataall = this.temp.filter(item => {
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  get_data() {
    this.reportService.getParameter().subscribe(data => {
      this.parameterData = data;
    });
    this.testservice.getTest().subscribe( data => {
      this.testdata = data;
              });
    this.uniqueNames = [];
    // this.SpinnerService.show();
    this.reportService.getReport().subscribe(data => {
      this.allreportData = data;
      this.patientservice.getPatient().subscribe(data => {
        this.patientData = data;
        if (this.allreportData.length > this.patientData.length) {
          this.allreportData.forEach((repo, i) => {
            this.patientData.forEach(patientdata => {
              if (repo.patients_id == patientdata.id) {
                let authData: any;
                let paraData:any;
                let selctTest = [];
                let uniqueNames = []
                let stest = JSON.parse(repo.test);
                if (repo.authorised != null) {
                  authData = JSON.parse(repo.authorised);
                  stest.forEach(t => {
                    authData.forEach(p => {
                      if (p.tid == t.id) {
                   
                        t.testauth = p.auth;
                      }
                    });
                  });
                 
                }
                if(repo.parameter_data != null) {
                  paraData = JSON.parse(repo.parameter_data);
                  stest.forEach(t => {
                    paraData.forEach(p => {
                      if (p.testId == t.id && p.value != '') {
                        selctTest.push(t.id);
                    
                      }
                    });
                  });
                  selctTest.forEach(element => {
                    if (uniqueNames.includes(element) != true) uniqueNames.push(element);
                  });
                  uniqueNames.forEach(tid => {
                    stest.forEach(t => {
                      if(t.id == tid){
                        t.valueEntered = true;
                      }
                    });
                  });
                }
           
                this.reportList.push({ 'rid': repo.id, 'pname': patientdata.prefix + ' ' + patientdata.first_name, 'pid': 'PDP' + patientdata.id, 'doctor': repo.name, 'register': repo.created_at, 'test': stest, 'para': uniqueNames, patientId: patientdata.id });
             
              }
            });

          });
        } else {
          this.patientData.forEach((patientdata, i) => {
            this.allreportData.forEach(repo => {
              this.uniqueNames = [];
              if (repo.patients_id == patientdata.id) {
                let stest = JSON.parse(repo.test);
                let authData: any;
                let selctTest = [];
                let paraData:any;
                let uniqueNames = [];
                if (repo.authorised != null) {
                  authData = JSON.parse(repo.authorised);
                  stest.forEach(t => {
                    authData.forEach(p => {
                      if (p.tid == t.id) {
                      
                        t.testauth = p.auth;
                      }
                    });
                  });
              
                }
                if(repo.parameter_data != null) {
                  paraData = JSON.parse(repo.parameter_data);
                  stest.forEach(t => {
                    paraData.forEach(p => {
                      if (p.testId == t.id && p.value != '') {
                        selctTest.push(t.id);
                        
                      }
                    });
                  });
                  selctTest.forEach(element => {
                    if (uniqueNames.includes(element) != true) uniqueNames.push(element);
                  });
                  uniqueNames.forEach(tid => {
                    stest.forEach(t => {
                      if(t.id == tid){
                        t.valueEntered = true;
                      }
                    });
                  });
                }
               
                this.reportList.push({ 'rid': repo.id, 'pname': patientdata.prefix + ' ' + patientdata.first_name, 'pid': 'PDP' + patientdata.id, 'doctor': repo.name, 'register': repo.created_at, 'test': stest,  patientId: patientdata.id, 'para': uniqueNames });
               
              }
            });
          });
        }
        this.temp = this.reportList;
        this.dataall = [...this.temp];
      });// this.SpinnerService.hide();
      setTimeout(() => {
        this.loadingIndicator = false;
      });
    });
  }

  editReport(id: any) {
    this.router.navigate(['edit-report', id]);
  }
  generatePdf(repoid, patid, test) {
    this.repoid = repoid;
    this.patid = patid;
    this.test = test;
    
    if(this.test.length != 1){
    this.display = true;
    }else{
this.testSubmit(null);
    }


 
  // this.reportService.generatePDF(repodata[0], this.parameterData, patdata[0], this.testdata,testArr=[]);
   
   

  }

  testSubmit(v){
  let testArr = [];
 
  if(v == null){
    this.test.forEach((t)=>{
     
      testArr.push(t.id.toString());
    });
  }

    for (const property in v) {
  
 if(v[property] == true){
  let tid = property.split('-')[1];
  testArr.push(tid);
 }

     
    }
    let repoid = this.repoid;
    let patid = this.patid;
    let repodata = [];
    let patdata = [];
    this.allreportData.forEach(element => {
      if (element.id == repoid) {
        repodata.push(element);
      }
    });
    this.patientData.forEach(element => {
      if (element.id == patid) {
        patdata.push(element);
      }
    });
    
     this.reportService.generatePDF(repodata[0], this.parameterData, patdata[0], this.testdata, testArr);
     this.display = false;
  }
  deleteRepo(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reportService.deleteRepo(id).subscribe(data => {
          this._toastService.success('Report Deleted Sucessfully');
          this.reportList = [];
          this.get_data();
        });
      }
    });
  }
}
