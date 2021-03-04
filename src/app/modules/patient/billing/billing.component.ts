import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { DoctorserviceService } from 'src/app/services/doctorservice.service';


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
  }

  allDoctor: any;
  temp: any;
  billingForm: FormGroup;
  disabled = true;
  ShowFilter = true;
  limitSelection = true;
  tests: any;
  selectedTests: any;
  dropdownSettings = {};
  idField: any;
  displayBillingPopup = false;

  // Billing Popup
  DisplayBilling() {
    this.displayBillingPopup = true;
  }

  toggleDisplayBillingPopup(v: boolean) {
    this.displayBillingPopup = v;
    console.log(v);
  }

  constructor(private fb: FormBuilder, private docService: DoctorserviceService) {
    this.billingForm = this.fb.group({
      tests: [this.selectedTests]
    });
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((row) => this.billing_data(row));
    this.eventsSubscription = this.events.subscribe((row) => this.get_doctor());

    this.tests = [
      { "test_id": 1, "test_name": "Blood Sugar test", "test_price": "100" },
      { "test_id": 2, "test_name": "ANA (Antinuclear Antibody)", "test_price": "100" },
      { "test_id": 3, "test_name": "Amylase Test", "test_price": "100" },
      { "test_id": 4, "test_name": "CBC (Complete Blood Count)", "test_price": "100" },
      { "test_id": 5, "test_name": "CRP (C – Reactive protein)", "test_price": "250" },
      { "test_id": 6, "test_name": "Hemoglobin A1C (HbA1c)", "test_price": "100" },
      { "test_id": 7, "test_name": "MRI Scans", "test_price": "100" },
      { "test_id": 8, "test_name": "CT Scans", "test_price": "1000" }
    ];
    this.selectedTests = [
      { "test_id": 8, "test_name": "CT Scans", "test_price": "1000" },
      { "test_id": 5, "test_name": "CRP (C – Reactive protein)", "test_price": "250" }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'test_id',
      textField: 'test_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
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

