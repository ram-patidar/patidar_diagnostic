import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { Subject } from 'rxjs';
import { PatientServiceService } from 'src/app/services/patient-service.service';




@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss']
})
export class AddNewPatientComponent implements OnInit {
  data:any;
  displaytoast = false;

  //  @Output() onDatePicked = new EventEmitter<any>();
   @Output() onTogglePatient = new EventEmitter<boolean>();
   @Output() onPatientAdded = new EventEmitter<boolean>();

   onToggle(addPatient: boolean){
    this.onTogglePatient.emit(addPatient);
}


addPatientForm:FormGroup;

  constructor(private PatService:PatientServiceService, private fb:FormBuilder, private _toastService: ToastService) {
    this.addPatientForm = this.fb.group({
      prefix:['', [Validators.required]],
      first_name:['', [Validators.required]],
      gender:['', [Validators.required]],
      age:['', [Validators.required]],
      contact:['', [Validators.required]],
      address:['', [Validators.required]]
          })
   }

  ngOnInit(): void {
   
    
  }

  getPrefix(e){
    if(e.addPatientForm.value.prefix == 'Mr.'){
      this.addPatientForm.controls['gender'].setValue('M');

    }
    if(e.addPatientForm.value.prefix == 'Mrs.'){
      this.addPatientForm.controls['gender'].setValue('F');
    }
 
  }

  addPatient(){
    this.PatService.addPatient(this.addPatientForm.value).subscribe(data => {
      this.data = data;
      if(this.data.success == 1){
     
        this.displaytoast = true;
      this._toastService.success('Patient added sucessfully!!');
      this.onPatientAdded.emit(this.addPatientForm.value);
 
      this.addPatientForm.reset();
      
      }
    })
  
  }


}
