import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PatientServiceService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-billing-modal',
  templateUrl: './billing-modal.component.html',
  styleUrls: ['./billing-modal.component.scss']
})
export class BillingModalComponent implements OnInit {
  @Input() events: Observable<void>;
  private eventsSubscription: Subscription;
  patientData:any;
  billPrint = true;
  todaydate = new Date();
  AllbillingData:any;
  total = 0;
@Output() onToggleBilling = new EventEmitter<boolean>();
onToggle(addBilling: boolean){
 this.onToggleBilling.emit(addBilling);
}

  constructor(private patientService:PatientServiceService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((row) => this.billing_data(row));
  }


  billing_data(row){
    this.total = 0;

    let testData = row.test;
    console.log(testData);
    testData.forEach(obj => {
      this.total = this.total+parseInt(obj.price);
    });
  
this.patientService.getPatient().subscribe( data => {
  this.patientData = data;

  this.patientData.forEach(obj => {
    if(obj.id == row.patients_id){
      row.patientData = obj;
      this.AllbillingData = row;
      console.log(this.AllbillingData);
    }
  });
})


  }

  printBill(){
    this.billPrint = false;
    window.print();
    this.billPrint = true;
  }
}
