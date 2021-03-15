import { Component, ViewChild, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  public dataall: any;
  @ViewChild('search', { static: false }) search: any;
  public temp: any;
  public selected = [];
  public testdata = [];
  public editData = [];
  patientData:any;
  allreportData:any;
  loopData:any;
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
  constructor(private reportService:ReportServiceService, private patientservice:PatientServiceService, private router:Router) { }

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
   
    // this.SpinnerService.show();
    this.reportService.getReport().subscribe(data => {
      this.allreportData = data;
      this.patientservice.getPatient().subscribe(data => {
        this.patientData = data;
  if(this.allreportData.length > this.patientData.length){
    this.allreportData.forEach((repo,i) => {
     this.patientData.forEach(patientdata => {
      if(repo.patients_id == patientdata.id){
        this.reportList.push({'rid':repo.id,'pname':patientdata.prefix+' '+patientdata.first_name,'pid':'PDP'+patientdata.id, 'doctor':repo.name, 'register':repo.created_at, 'test':JSON.parse(repo.test)});
        
      }
     });
    
    });
  }else{
    this.patientData.forEach((patientdata,i) => {
      this.allreportData.forEach(repo => {
       if(repo.patients_id == patientdata.id){
         this.reportList.push({'rid':repo.id, 'pname':patientdata.prefix+' '+patientdata.first_name,'pid':'PDP'+patientdata.id, 'doctor':repo.name, 'register':repo.created_at, 'test':JSON.parse(repo.test)});
     
       }
      });
     
     });
 
  }
  this.temp = this.reportList;
  this.dataall = [...this.temp];
  });
});
     
     
      // this.SpinnerService.hide();
      setTimeout(() => {
        this.loadingIndicator = false;
      });
 
  }

  editReport(id:any){
    this.router.navigate(['edit-report', id]);
  }

}
