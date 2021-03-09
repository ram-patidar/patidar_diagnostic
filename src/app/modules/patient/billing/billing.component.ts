import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { DoctorserviceService } from 'src/app/services/doctorservice.service';
import { ReportServiceService } from 'src/app/services/report-service.service';
import { TestServiceService } from 'src/app/services/test-service.service';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  todayDate = new Date();
  allreportData:any;
  @Input() events: Observable<void>;
  private eventsSubscription: Subscription;
  eventsSubject: Subject<void> = new Subject<void>();
  @Input() receivedBillingData: any;

  @Output() onToggleBilling = new EventEmitter<boolean>();
  onToggle(addPatient: boolean) {
    this.onToggleBilling.emit(addPatient);
    this.billingForm.reset();
    this.selectedTests = [];
    this.total = 0;
  }

  allDoctor: any;
  temp: any;
  billingForm: FormGroup;
  disabled = true;
  ShowFilter = true;
  limitSelection = true;
  tests: any;
  selectedTests = [];
  dropdownSettings = {};
  idField: any;
  textField1:any;
  testallData:any;
  displayBillingPopup = false;
  total = 0;
  patientid:any;

  // Billing Popup
  DisplayBilling() {
    this.displayBillingPopup = true;
  }

  toggleDisplayBillingPopup(v: boolean) {
    this.displayBillingPopup = v;
    console.log(v);
  }

  constructor(private fb: FormBuilder, private docService: DoctorserviceService, private testService:TestServiceService, private report:ReportServiceService) {
    this.billingForm = this.fb.group({
      test: [this.selectedTests,Validators.required],
      patients_id:[this.patientid],
      name:['']
    });
  }

  ngOnInit() {
  
    this.testData();
    this.eventsSubscription = this.events.subscribe((row) => this.billing_data(row));
    this.eventsSubscription = this.events.subscribe((row) => this.get_doctor());
  

    this.tests = [];
    this.selectedTests = [];
  
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'test_name',
      price: 'test_price',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  onItemSelect(item: any) {
    // this.selectedTests.push(item);
    
  this.testallData.forEach(element => {
      if(item.id == element.id){
        console.log(element);
         this.selectedTests.push(element);
         this.total = this.total+parseInt(element.price);
      }
    });
   
    console.log(this.testallData);
  }
  OnItemDeSelect(item: any) {
    
    this.testallData.forEach(element => {
      if(item.id == element.id){
        this.selectedTests.splice(this.selectedTests.indexOf(element),1);
        this.total = this.total - parseInt(element.price);
      }
    });
  
   
  }
  testData(){
    this.testService.getTest().subscribe( data => {
this.testallData = data;
this.tests = data;
    });
  }
  onSelectAll(items: any) {
    
    this.testallData.forEach((element,i) => {
 if(items[i].id == element.id){
  this.selectedTests.push(element);
        this.total = this.total + parseInt(element.price);
      }
    });
  }
  onDeSelectAll(items: any) {
    this.selectedTests = [];
   this.total = 0;
   
  }

  billing_data(row: any) {
    let l = '';
    if(row.first_name.split(" ").length == 2){
 l = row.first_name.split(" ")[1][0];
    }
    row.fl = row.first_name.split(" ")[0][0]+l;

    this.receivedBillingData = row;
    
    this.billingForm.controls['patients_id'].setValue(row.id);

    console.log(this.billingForm.value);
  }

  get_doctor() {
    this.docService.getDoctor().subscribe(data => {
      this.allDoctor = data;
    });
  }

  addBilling(){
    this.billingForm.value.test = this.selectedTests;


    this.report.addReport(this.billingForm.value).subscribe( data => {
      this.allreportData = data;
      if(this.allreportData.id != 0){
      this.displayBillingPopup = true;
    
      this.billingForm.value.id = this.allreportData.id;
   
      this.eventsSubject.next(this.billingForm.value);
      this.onToggle(false);
    }
    });
  }
}


