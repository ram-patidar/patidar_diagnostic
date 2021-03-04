import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-billing-modal',
  templateUrl: './billing-modal.component.html',
  styleUrls: ['./billing-modal.component.scss']
})
export class BillingModalComponent implements OnInit {

@Output() onToggleBilling = new EventEmitter<boolean>();
onToggle(addBilling: boolean){
 this.onToggleBilling.emit(addBilling);
}

  constructor() { }

  ngOnInit(): void {
  }

}
