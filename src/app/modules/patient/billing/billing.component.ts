import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  todayDate = new Date();
  @Input() events: Observable<void>;
  private eventsSubscription: Subscription;
  @Input() receivedBillingData:any;
  @Output() onToggleBilling = new EventEmitter<boolean>();
 onToggle(addPatient: boolean){
  this.onToggleBilling.emit(addPatient);
}

  billingForm: FormGroup;
  disabled = true;
  ShowFilter = true;
  limitSelection = true;
  tests: any;
  selectedItems: any;
  dropdownSettings = {};
  idField: any;
 

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      tests: [this.selectedItems]
    });
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((row) => this.billing_data(row));
    this.tests = [
      { item_text: 'Mumbai' },
      { item_text: 'Bangaluru' },
      { item_text: 'Pune' },
      { item_text: 'Navsari' },
      { item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      {  item_text: 'Pune' },
      {  item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    console.log(this.receivedBillingData);
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  billing_data(row:any){
this.receivedBillingData = row;


  }


  
}
