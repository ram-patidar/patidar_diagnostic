import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { DoctorserviceService } from 'src/app/services/doctorservice.service';
import { TestServiceService } from 'src/app/services/test-service.service';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  todayDate = new Date();
  
  @Input() events: Observable<void>;
  private eventsSubscription: Subscription;
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

  // Billing Popup
  DisplayBilling() {
    this.displayBillingPopup = true;
  }

  toggleDisplayBillingPopup(v: boolean) {
    this.displayBillingPopup = v;
    console.log(v);
  }

  constructor(private fb: FormBuilder, private docService: DoctorserviceService, private testService:TestServiceService) {
    this.billingForm = this.fb.group({
      tests: [this.selectedTests]
    });
  }

  ngOnInit() {
    this.testData();
    this.eventsSubscription = this.events.subscribe((row) => this.billing_data(row));
    this.eventsSubscription = this.events.subscribe((row) => this.get_doctor());

   
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'test_name',
      textField1: 'price',
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
    this.receivedBillingData = row;
  }

  get_doctor() {
    this.docService.getDoctor().subscribe(data => {
      this.allDoctor = data;
    });
  }
}

