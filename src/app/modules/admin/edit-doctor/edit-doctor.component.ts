import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { Observable, Subscription } from 'rxjs';
import { DoctorserviceService } from 'src/app/services/doctorservice.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent implements OnInit {
  updatedData:any;
  updateNoti = false;
@Output() onToggleDoctor = new EventEmitter<boolean>();
@Input() events: Observable<void>;
Editdata:any;
private eventsSubscription: Subscription;
editDoctorForm:FormGroup;
onToggle(doctor: boolean){
 this.onToggleDoctor.emit(doctor);
}

  constructor(private fb:FormBuilder, private docService:DoctorserviceService, private _toastService:ToastService) {
    
    this.editDoctorForm = this.fb.group({
      name:['',Validators.required],
      contact:['',Validators.required],
      ocupation:['',Validators.required]
      });
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((row) => this.editdoctorChild(row));
  }

  editdoctorChild(row:any){
this.updateNoti = false;
   this.Editdata = row;
this.editDoctorForm = this.fb.group({
name:[this.Editdata.name,Validators.required],
contact:[this.Editdata.contact,Validators.required],
ocupation:[this.Editdata.ocupation,Validators.required]
});
   

    }

    updateDoctor(){
      this.docService.updateDoctor(this.Editdata.id,this.editDoctorForm.value).subscribe(data => {
       this.updatedData = data;
        if(this.updatedData.success == 1){
          this.updateNoti = true;
          this._toastService.success('Doctor updated successfully !!');
        }
      });
    }

   

}


