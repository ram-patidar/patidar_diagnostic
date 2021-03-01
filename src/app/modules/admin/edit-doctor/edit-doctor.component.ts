import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent implements OnInit {

@Output() onToggleDoctor = new EventEmitter<boolean>();
onToggle(doctor: boolean){
 this.onToggleDoctor.emit(doctor);
}

  constructor() { }

  ngOnInit(): void {
  }

}
