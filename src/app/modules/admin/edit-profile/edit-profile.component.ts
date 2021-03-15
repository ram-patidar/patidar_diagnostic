import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  private eventsSubscription: Subscription;
 @Output() onToggleProfile = new EventEmitter<boolean>();
 @Input() events: Observable<void>;
 userData:any;
 onToggle(profile: boolean){
  this.onToggleProfile.emit(profile);
}
userform:FormGroup;

  constructor(private fb:FormBuilder, private authServ:AuthserviceService, private toast:ToastService) { 
this.userform = this.fb.group({
  name:['',Validators.required],
  occupation:[''],
  contact_no:[''],
  email:['',[Validators.required, Validators.email]],
  dob:['']
})


  }
  ngOnInit(): void {

    this.eventsSubscription = this.events.subscribe((row) => this.editUser(row));
  }


  editUser(data:any){
    console.log(data);
    this.userData = data;
    this.userform = this.fb.group({
      name:[data[0].name,Validators.required],
      occupation:[data[0].occupation],
      contact_no:[data[0].contact_no],
      email:[data[0].email,[Validators.required, Validators.email]],
      dob:[data[0].dob]
    })
  
  }

  updateUser(){
    console.log(this.userData[0].id);
    this.authServ.updateUser(this.userData[0].id,this.userform.value).subscribe(data => {
      console.log(data);
      localStorage.removeItem('name');
      localStorage.setItem('name', this.userform.controls['name'].value);
      this.toast.success('Profile Updated Successfully !!');
    });
 
   
  }
}
