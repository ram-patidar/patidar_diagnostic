import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { PatientServiceService } from 'src/app/services/patient-service.service';




@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss']
})
export class AddNewPatientComponent implements OnInit {
  data:any;

  //  @Output() onDatePicked = new EventEmitter<any>();
   @Output() onTogglePatient = new EventEmitter<boolean>();
  
   onToggle(addPatient: boolean){
    this.onTogglePatient.emit(addPatient);
  
}
addPatientForm:FormGroup;

  constructor(private PatService:PatientServiceService, private fb:FormBuilder) {
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

  addPatient(){
    this.PatService.addPatient(this.addPatientForm.value).subscribe(data => {
      this.data = data;
      console.log(data);
    })
    
  }


}
