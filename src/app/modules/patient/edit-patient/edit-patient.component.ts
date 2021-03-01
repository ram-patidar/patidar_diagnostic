import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientServiceService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  @Input() receivedEditdata: any;

  data:any;

  @Output() onToggleEditPatient = new EventEmitter<boolean>();
  
  onToggle(editPatient: boolean){
   this.onToggleEditPatient.emit(editPatient);

}

EditPatientForm:FormGroup;

  constructor(private fb:FormBuilder, private patService:PatientServiceService) { 

    
  }

  ngOnInit(): void {

    this.EditPatientForm =  this.fb.group({
      prefix:[this.receivedEditdata.prefix, [Validators.required]],
      first_name:[this.receivedEditdata.first_name, [Validators.required]],
      gender:[this.receivedEditdata.gender, [Validators.required]],
      age:[this.receivedEditdata.age, [Validators.required]],
      contact:[this.receivedEditdata.contact, [Validators.required]],
      address:[this.receivedEditdata.address, [Validators.required]]

    });
  }

 

  UpdatePatient(){
    this.patService.updatePatient(this.EditPatientForm.value).subscribe(data => {
      this.data = data;
      console.log(data);
    })
    console.log(this.EditPatientForm.value);
  }

  getPrefix(e){
    if(e.EditPatientForm.value.prefix == 'Mr.'){
      e.EditPatientForm.value.gender = 'M';
      this.EditPatientForm =  this.fb.group({
        prefix:[e.EditPatientForm.value.prefix, [Validators.required]],
        first_name:[this.receivedEditdata.first_name, [Validators.required]],
        gender:['M', [Validators.required]],
        age:[this.receivedEditdata.age, [Validators.required]],
        contact:[this.receivedEditdata.contact, [Validators.required]],
        address:[this.receivedEditdata.address, [Validators.required]]
  
      });
    }
    if(e.EditPatientForm.value.prefix == 'Mrs.'){
      this.EditPatientForm =  this.fb.group({
        prefix:[e.EditPatientForm.value.prefix, [Validators.required]],
        first_name:[this.receivedEditdata.first_name, [Validators.required]],
        gender:['F', [Validators.required]],
        age:[this.receivedEditdata.age, [Validators.required]],
        contact:[this.receivedEditdata.contact, [Validators.required]],
        address:[this.receivedEditdata.address, [Validators.required]]
  
      });
      

    }
  }



}
