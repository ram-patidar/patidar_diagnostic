import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { DoctorserviceService } from 'src/app/services/doctorservice.service';

@Component({
  selector: 'app-add-new-doctor',
  templateUrl: './add-new-doctor.component.html',
  styleUrls: ['./add-new-doctor.component.scss']
})
export class AddNewDoctorComponent implements OnInit {
  data:any;

  displaytoastdoctor = false;
  addDoctorForm:FormGroup;
@Output() onToggleDoctor = new EventEmitter<boolean>();
@Output() onAddedDoctor = new EventEmitter<boolean>();
onToggle(doctor: boolean){
 this.onToggleDoctor.emit(doctor);
}

  constructor(private fb:FormBuilder, private docservice:DoctorserviceService,  private _toastService: ToastService) {

this.addDoctorForm = this.fb.group({
  name:['',Validators.required],
  ocupation:['',Validators.required],
  contact:['',Validators.required]
})
   }

  ngOnInit(): void {
  }

  addDoctor(){
    this.docservice.addDoctor(this.addDoctorForm.value).subscribe(data => {
      this.data = data;
      if(this.data.success == 1){
    
        this.displaytoastdoctor = true;
this._toastService.success('Doctor added Sucessfully!!');
this.addDoctorForm.reset();
this.onAddedDoctor.emit(true);
      }
    })
  }

}

