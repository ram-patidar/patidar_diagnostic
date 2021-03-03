import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { Observable, Subscription } from 'rxjs';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  @Input() events: Observable<void>;
  private eventsSubscription: Subscription;
  @Input() receivedEditdata:any;
  data:any;
  id:any;
  displaytoast = true;

  @Output() onToggleEditPatient = new EventEmitter<boolean>();
  @Output() displayPatientData = new EventEmitter<boolean>();
  
  onToggle(editPatient: boolean){
   this.onToggleEditPatient.emit(editPatient);

}

EditPatientForm:FormGroup;

  constructor(private fb:FormBuilder, private patService:PatientServiceService, private _toastService: ToastService) { 
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((row) => this.editPatientChild(row));
    this.EditPatientForm =  this.fb.group({
      prefix:['', [Validators.required]],
      first_name:['', [Validators.required]],
      last_name:['', [Validators.required]],
      gender:['', [Validators.required]],
      age:['', [Validators.required]],
      contact:['', [Validators.required]],
      address:['', [Validators.required]]
    
    });
   

  }



editPatientChild(row:any){
  this.receivedEditdata = row;
this.EditPatientForm =  this.fb.group({
  prefix:[this.receivedEditdata.prefix, [Validators.required]],
  first_name:[this.receivedEditdata.first_name, [Validators.required]],
  last_name:[this.receivedEditdata.last_name, [Validators.required]],
  gender:[this.receivedEditdata.gender, [Validators.required]],
  age:[this.receivedEditdata.age, [Validators.required]],
  contact:[this.receivedEditdata.contact, [Validators.required]],
  address:[this.receivedEditdata.address, [Validators.required]]

});
this.id = row.id;

  }

  UpdatePatient(id:any){
    this.patService.updatePatient(id,this.EditPatientForm.value).subscribe(data => {
      this.data = data;
   
      if(this.data.success == 1){
        this.displaytoast = true;
        this._toastService.success('Patient Updated sucessfully !!');
        this.onToggle(false);
        this.displayPatientData.emit();
      }
      
     
    })
  
   
  }

  getPrefix(e){
    if(e.EditPatientForm.value.prefix == 'Mr.'){
      this.EditPatientForm.controls['gender'].setValue('M');
    }
    if(e.EditPatientForm.value.prefix == 'Mrs.'){
      this.EditPatientForm.controls['gender'].setValue('F');
      

    }
  }
 
  deletePatient(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.patService.deletePatient(id).subscribe(data => {
          console.log(data);
          this._toastService.success('Patient Deleted Sucessfully');
          this.onToggle(false);
          this.displayPatientData.emit();
        });
      }
    })








}
}