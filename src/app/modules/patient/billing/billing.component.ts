import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  
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
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  
}
